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
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/get-user-cookie`, {
      credentials: 'include',
    })
      .then(async res => {
        if (!res.ok) throw new Error('No user');
        const data = await res.json();
        if (data && data.userId) {
          setUserId(data.userId);
          setIsAdmin(data.role === 'admin');
          // setUserInfo(data);

          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${data.userId}`, {
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${userId}`,
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/logout`, {
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
      <div className="absolute h-20 bg-[radial-gradient(circle_at_10%_20%,rgba(255,192,203,0.3),transparent_70%),radial-gradient(circle_at_90%_80%,rgba(255,182,193,0.2),transparent_100%)] blur-2xl pointer-events-none" />
      <div className="relative bg-transparent px-6 py-4 flex justify-between items-center">
        <Link href="/leading" className="flex items-center">
          <img
            src="/LOGO.png"
            alt="Heart Logo"
            className="w-7 h-7 hover:scale-110 transition-transform duration-300"
          />
        </Link>

        <div className='flex gap-4 md:flex hidden'>
          <div className="flex items-center gap-4 text-black">
          <Link 
              href="/service-list"
              className="text-black-500 hover:text-pink-600 transition duration-300"
              aria-label="services page"
          >
            Services
          </Link>
          <Link 
              href="/about"
              className="text-black-500 hover:text-pink-600 transition duration-300"
              aria-label="About page"
          >
            About Us
          </Link>
          <Link 
              href="/contact-us"
              className="text-black-500 hover:text-pink-600 transition duration-300"
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
                  className="text-black-500 hover:text-pink-600 transition duration-300"
                  aria-label="Admin page"
                >
                  <span className="text-lg font-bold">
                    <Info />
                  </span>
                </Link>
              )}
              <button
                onClick={() => setOpen(true)}
                className="text-black-500 hover:text-pink-600 transition duration-300"
                aria-label="Show user info"
              >
                <UserCircle className="w-8 h-8" />
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
                  className="text-black-500 hover:text-pink-600 transition duration-300"
                  aria-label="Admin page"
                >
                  <span className="text-lg font-bold">
                    <Info />
                  </span>
                </Link>
              )}
              <button
                onClick={() => setOpen(true)}
                className="text-black-500 hover:text-pink-600 transition duration-300"
                aria-label="Show user info"
              >
                <UserCircle className="w-8 h-8" />
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
