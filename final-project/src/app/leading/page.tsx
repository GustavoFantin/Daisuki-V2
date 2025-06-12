'use client'

import Header from "@/components/Header";
import Background from "../about/Background";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './styles.css';

import { EffectCoverflow, Pagination } from 'swiper/modules';
import Footer from "@/components/Footer";


const popularGirls = [
    {
    "avatar": "https://mcphils.s3.us-east-2.amazonaws.com/daisuki/stacey.png",
    "name": "Stacey",
    "height": 160,
    "age": 34,
    "nationality": "Japanese",
    "self_introduction": "Loves hot springs and stargazing 🌌. Dreams of opening a cat café ☕🐱.",
    "price": 120,
    "available_time": "Weekends",
    "price_id": "price_1RONbrFqqSa2A5uYCpQPLtPf",
    "__v": 0,
    "hashtags": [
      "NatureLover",
      "CatCafeDream"
    ],
    "id": "68239710878e3b09ef37e9cf"
  },
  {
    "avatar": "https://mcphils.s3.us-east-2.amazonaws.com/daisuki/sunny.png",
    "name": "Sunny",
    "height": 165,
    "age": 28,
    "nationality": "Canadian",
    "self_introduction": "Programmer by day 👩‍💻, jazz bassist by night 🎵. I make the best scones in town!",
    "price": 150,
    "available_time": "Anytime",
    "price_id": "price_1RONd5FqqSa2A5uYI3g5VQKA",
    "__v": 0,
    "hashtags": [
      "TechAndJazz",
      "SconeQueen"
    ],
    "id": "6823978f878e3b09ef37e9d1"
  },
  {
    "avatar": "https://mcphils.s3.us-east-2.amazonaws.com/daisuki/mimi.png",
    "name": "Mimi",
    "height": 158,
    "age": 21,
    "nationality": "Korean",
    "self_introduction": "Otaku dancer + robot enthusiast 🤖✨. Collector of rare gachapon figures.",
    "price": 90,
    "available_time": "Weekends",
    "price_id": "price_1RONdaFqqSa2A5uYvJFOk7iw",
    "__v": 0,
    "hashtags": [
      "OtakuVibes",
      "GachaMaster"
    ],
    "id": "68239808878e3b09ef37e9d3"
  },
  {
    "avatar": "https://mcphils.s3.us-east-2.amazonaws.com/daisuki/joan.png",
    "name": "Joan",
    "height": 170,
    "age": 26,
    "nationality": "American",
    "self_introduction": "Extreme sports junkie 🏍️. Once jumped over three tents in a row (no cap).",
    "price": 180,
    "available_time": "Weekends",
    "price_id": "price_1RONeRFqqSa2A5uYxmELqXpE",
    "__v": 0,
    "hashtags": [
      "ThrillSeeker",
      "AdrenalineAddict"
    ],
    "id": "68239863878e3b09ef37e9d5"
  },
  {
    "avatar": "https://mcphils.s3.us-east-2.amazonaws.com/daisuki/jacky.png",
    "name": "Jacky",
    "height": 172,
    "age": 22,
    "nationality": "Australian",
    "self_introduction": "Surfs at sunrise, Netflix at night 🌊🍿. The most chill date you’ll ever have.",
    "price": 100,
    "available_time": "Weekends",
    "price_id": "price_1RONeuFqqSa2A5uY1EgJCDoc",
    "__v": 0,
    "hashtags": [
      "SunriseChiller",
      "NetflixBuddy"
    ],
    "id": "682398b3878e3b09ef37e9d7"
  },
  {
    "avatar": "https://mcphils.s3.us-east-2.amazonaws.com/daisuki/luna.png",
    "name": "Luna",
    "height": 162,
    "age": 20,
    "nationality": "Swedish",
    "self_introduction": "Loves sunshine and beaches ☀️, and fun facts. Did you know sloths poop only once a week?",
    "price": 110,
    "available_time": "Weekends",
    "price_id": "price_1RONfHFqqSa2A5uYu8RXOUkX",
    "__v": 0,
    "hashtags": [
      "SunnyVibes",
      "TriviaQueen"
    ],
    "id": "68239915878e3b09ef37e9d9"
  },
]

const moments = [
  'moment1',
  'moment2',
  'moment3',
  'moment4',
  'moment5',
]

const comments = [
  {
    age: '20s',
    name: 'M',
    locate: 'Vancouver – Downtown',
    activity: 'Café Talk',
    hours: 2,
    provider: 'Sunny',
    context: 'It was my first time trying a rental date just to have someone to chat with. Sunny was so natural and warm — I loved the way her eyes lit up when she talked about jazz and tech. She even explained how scones rise (science!). I didn’t expect to feel so comfortable so quickly.',
    providerAvatar: 'https://mcphils.s3.us-east-2.amazonaws.com/daisuki/sunny.png'
  },
  {
    age: '30s',
    name: 'Y',
    locate: 'Vancouver – Metrotown',
    activity: 'Arcade Hangout',
    hours: 3,
    provider: 'Zoey',
    context: "My game center date with Zoey was seriously fun! I was nervous at first, but she beat me at every round and we ended up laughing so much. She's a great talker and had lots of cool stories from her streams. Time flew by.",
    providerAvatar: 'https://mcphils.s3.us-east-2.amazonaws.com/daisuki/zoey.png'
  },
  {
    age: '40s',
    name: 'K',
    locate: 'Vancouver – Trout Lake Park',
    activity: 'Park Walk & Talk',
    hours: 2,
    provider: 'Rika',
    context: "I booked Rika because her profile mentioned she was a theatre actress — and I got way more than I expected! She had the most adorable animal voice impressions and made me feel totally at ease. It felt like I was on a sitcom episode!",
    providerAvatar: 'https://mcphils.s3.us-east-2.amazonaws.com/daisuki/rika.png'
  },
  {
    age: '20s',
    name: 'H',
    locate: 'Vancouver – Commercial Drive',
    activity: 'Anime Shop Hopping',
    hours: 3,
    provider: 'Mimi',
    context: "Mimi and I explored anime shops together. Her excitement over gachapon was 100% real and totally contagious. We ended up finding a rare figure and she cheered like she just won the lottery. It was so fun to nerd out with someone!",
    providerAvatar: 'https://mcphils.s3.us-east-2.amazonaws.com/daisuki/mimi.png'
  },
  {
    age: '30s',
    name: 'T',
    locate: 'Vancouver – Kitsilano Beach',
    activity: 'Beach Walk',
    hours: 2.5,
    provider: 'Luna',
    context: "Luna was like a warm breeze on a cloudy day. We walked by the beach and talked about sloths, stars, and other random trivia. She has this soothing vibe that makes you forget time and stress. Would definitely book again.",
    providerAvatar: 'https://mcphils.s3.us-east-2.amazonaws.com/daisuki/luna.png'
  },
  {
    age: '20s',
    name: 'J',
    locate: 'Vancouver – Mount Pleasant',
    activity: 'Insta Café Date',
    hours: 2,
    provider: 'Chole',
    context: "Chole is all style and sparkle! We hung out at a trendy café and talked about fashion, memes, and emojis. She also gave me a quick “emoji personality reading” and it was scarily accurate 😂 Felt like a global influencer experience.",
    providerAvatar: 'https://mcphils.s3.us-east-2.amazonaws.com/daisuki/chole.png'
  }
]

export default function Leading() {
    return <>
      <Header />
      <section className="flex flex-col mt-20 mb-10 w-screen overflow-hidden justify-center items-center">
        <div className="w-[1440px] flex">
          <img 
            src="/leading/banner.png"
            alt="banner"
            className="w-[1440px] h-[500px]"
          />
        </div>
      </section>
      <section className="mb-10">
          <h1 className="text-5xl text-center">
              Popular Partners
          </h1>
          <div>
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                initialSlide={2}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper h-full"
              >
                {
                  popularGirls.map((popularGirl, index) => (
                    <SwiperSlide key={index}>
                        <div
                            key={index}
                            className="bg-white w-100 rounded-lg shadow-md overflow-hidden"
                        >
                          <div className="flex ">
                            <img
                                src={popularGirl.avatar}
                                alt={popularGirl.name}
                                className="w-full h-80 object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-xl font-semibold text-center">
                                {popularGirl.name}
                            </h3>
                          </div>  
                          <div className="px-7 pb-4 text-blue-400">
                            {popularGirl.hashtags?.map((tag, tagIndex) => (
                                <div key={`${popularGirl}-${tagIndex}`} className="font-bold">#{tag}</div>
                            ))}
                          </div>
                      </div>
                    </SwiperSlide>
                  ))
                }
            </Swiper>
          </div>
      </section>
      <section>
        <h1 className="text-5xl text-center">Moments</h1>
        <div>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            initialSlide={2}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper h-full"
          >
            {
              moments.map((moment, index) => (
                <SwiperSlide key={index}>
                  <div className="flex w-100 h-80">
                    <img 
                      src={`/leading/${moment}.png`} 
                      className="w-full h-full object-cover rounded-lg"
                    /> 
                  </div>
                  
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </section>
      <section>
        <h1 className="text-5xl text-center">Comments</h1>
        <div>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            initialSlide={2}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper h-full"
          >
            {comments.map((comment, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col gap-4 w-100 bg-red-50 rounded-4xl px-10 py-5">
                  <h3 className="text-lg font-bold">
                    {comment.age} - {comment.name}
                  </h3>
                  <div>
                    {comment.context}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <div>{comment.locate}</div>
                      <div>{comment.activity}</div>
                      <div>{comment.hours} hours</div>
                    </div>
                    <div className="flex w-10 h-10 rounded-full overflow-hidden">
                      <img 
                        src={comment.providerAvatar}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
        </div>
      </section>
      <Footer />
      <Background />
    </>
}