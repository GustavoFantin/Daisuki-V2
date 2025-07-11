'use client'

import { Info, UserCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import UserInfoModal from './UserInfoModal';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'
import Link from 'next/link'


const Header = ({setMenuOpen}: {setMenuOpen: (isOpen: boolean) => void}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter()
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    age: '',
    role: '',
  });

  useEffect(() => {
    fetch(`/api/user/get-user-cookie`, {
      credentials: 'include',
    })
      .then(async res => {
        if (!res.ok) throw new Error('No user');
        const data = await res.json();
        if (data && data.userId) {
          setUserId(data.userId);
          setIsAdmin(data.role === 'admin');
          // setUserInfo(data);

          fetch(`/api/user/${data.userId}`, {
            method: 'GET',
            credentials: 'include',
          })
            .then(res => res.json())
            .then((userData: any) => {
              setUserInfo(userData);
              setEditForm({
                username: userData.username || '',
                email: userData.email || '',
                age: userData.age?.toString() || '',
                role: userData.role || '',
              });
            });
        } else {
          setUserId(null);
          setUserInfo(null);
        }
      })
      .catch(() => {
        setUserId(null);
        setUserInfo(null);
      });
  }, []);

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    if (!userId) return;
    const res = await fetch(
      `/api/user/${userId}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: editForm.username,
          email: editForm.email,
          age: Number(editForm.age),
          role: editForm.role,
        }),
      }
    );
    if (res.ok) {
      const updated = await res.json();
      setUserInfo(updated);
      setIsEditing(false);
      toast.success('Edit successfully!');
    } else {
      toast.error('Failed to update user info...');
    }
  };

  const handleLogout = async () => {
    const res = await fetch(`/api/user/logout`, {
      method: 'post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      toast.success('Logged out successfully');
      router.push('/');
    } else {
      toast.error('Failed to logged out...');
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      {/* <div className="absolute h-20 bg-[radial-gradient(circle_at_10%_20%,rgba(255,192,203,0.3),transparent_70%),radial-gradient(circle_at_90%_80%,rgba(255,182,193,0.2),transparent_100%)] blur-2xl pointer-events-none" /> */}
      <div className="bg-transparent px-6 py-4 flex justify-between items-center">
        <Link href="/leading" className="flex items-center">
          <img
            src="/LOGO.png"
            alt="Heart Logo"
            className="w-13 h-13 hover:scale-110 transition-transform duration-300 rounded-full"
          />
        </Link>

        <div className='flex gap-4 md:flex hidden'>
          <div className="flex items-center gap-4 text-black!">
          <Link 
              href="/service-list"
              className="text-black! hover:text-pink-600 transition duration-300"
              aria-label="services page"
          >
            Services
          </Link>
          <Link 
              href="/about"
              className="text-black! hover:text-pink-600 transition duration-300"
              aria-label="About page"
          >
            About Us
          </Link>
          <Link 
              href="/contact-us"
              className="text-black! hover:text-pink-600 transition duration-300"
              aria-label="Contact page"
          >
            Contact
          </Link>
        </div>

        {userId ? (
            <>
              <button
                className="cursor-pointer px-4 py-2 border-black border-1 rounded-full hover:border-pink-600 hover:text-pink-600 hover:scale-110 transition-transform duration-300"
                onClick={handleLogout}
              >
                Log out
              </button>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="text-black! hover:text-pink-600 transition duration-300"
                  aria-label="Admin page"
                >
                  <span className="text-lg font-bold">
                    <Info />
                  </span>
                </Link>
              )}
              <button
                onClick={() => setOpen(true)}
                className="text-black! hover:text-pink-600 transition duration-300 cursor-pointer"
                aria-label="Show user info"
              >
                <svg width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_225_2)">
                <path d="M14 11.3344L10.3344 10.6687C10 10 10 9.70938 10 9.33438C10.3344 9 11 8.66875 11 8.33438C11.3344 7.33438 11.3344 6.66875 11.3344 6.66875C11.5063 6.41875 12 6.00312 12 5.33437C12 4.66562 11.3344 4 11.3344 3.66875C11.3344 1 9.975 0 8 0C6.10938 0 4.66563 1 4.66563 3.66563C4.66563 4 4 4.66563 4 5.33125C4 5.99688 4.475 6.4375 4.66563 6.66563C4.66563 6.66563 4.66563 7.33125 5 8.33125C5 8.66563 5.66563 8.99688 6 9.33125C6 9.66563 6 9.99687 5.66563 10.6656L2 11.3344C0.665625 11.6656 0 14 0 16H16C16 14 15.3344 11.6656 14 11.3344Z" fill="black"/>
                </g>
                <defs>
                <clipPath id="clip0_225_2">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
                </defs>
                </svg>

              </button>
              <UserInfoModal
                userInfo={userInfo}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                editForm={editForm}
                setEditForm={setEditForm}
                open={open}
                setOpen={setOpen}
                handleEditChange={handleEditChange}
                handleEditSave={handleEditSave}
              />
            </>
          ) : (
            <button
              className="cursor-pointer px-4 py-2 border-black border-1 rounded-full hover:border-pink-600 hover:text-pink-600 hover:scale-110 transition-transform duration-300"
              onClick={() => router.push('/signin')}
            >
              Login
            </button>
          )}
        </div>
        <div className='md:hidden flex gap-4'>
          {userId ? (
            <>
              <button
                className="cursor-pointer px-4 py-2 border-black border-1 rounded-full hover:border-pink-600 hover:text-pink-600 hover:scale-110 transition-transform duration-300"
                onClick={handleLogout}
              >
                Log out
              </button>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="text-black! hover:text-pink-600 transition duration-300"
                  aria-label="Admin page"
                >
                  <span className="text-lg font-bold">
                    <Info />
                  </span>
                </Link>
              )}
              <button
                onClick={() => setOpen(true)}
                className="text-black! hover:text-pink-600 transition duration-300 cursor-pointer"
                aria-label="Show user info"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_225_2)">
                  <path d="M14 11.3344L10.3344 10.6687C10 10 10 9.70938 10 9.33438C10.3344 9 11 8.66875 11 8.33438C11.3344 7.33438 11.3344 6.66875 11.3344 6.66875C11.5063 6.41875 12 6.00312 12 5.33437C12 4.66562 11.3344 4 11.3344 3.66875C11.3344 1 9.975 0 8 0C6.10938 0 4.66563 1 4.66563 3.66563C4.66563 4 4 4.66563 4 5.33125C4 5.99688 4.475 6.4375 4.66563 6.66563C4.66563 6.66563 4.66563 7.33125 5 8.33125C5 8.66563 5.66563 8.99688 6 9.33125C6 9.66563 6 9.99687 5.66563 10.6656L2 11.3344C0.665625 11.6656 0 14 0 16H16C16 14 15.3344 11.6656 14 11.3344Z" fill="black"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_225_2">
                  <rect width="16" height="16" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
              </button>
              <UserInfoModal
                userInfo={userInfo}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                editForm={editForm}
                setEditForm={setEditForm}
                open={open}
                setOpen={setOpen}
                handleEditChange={handleEditChange}
                handleEditSave={handleEditSave}
              />
            </>
          ) : (
            <button
              className="cursor-pointer px-4 py-2 border-black border-1 rounded-full hover:border-pink-600 hover:text-pink-600 hover:scale-110 transition-transform duration-300"
              onClick={() => router.push('/signin')}
            >
              Login
            </button>
          )}
          <button aria-label="burgar menu" className="btn btn-square btn-ghost cursor-pointer" onClick={() => setMenuOpen(true)}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H21M3 12H21M3 18H21" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
