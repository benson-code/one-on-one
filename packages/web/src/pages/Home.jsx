import React from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import taipeiImage from '../assets/taipei-101.jpg'

function Home() {

  const featuredGuides = [
    {
      id: 1,
      name: 'Ethan Carter',
      specialty: 'Expert of Neurological surgery',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJLzlS7ubnGckKEhFmdL5GW07p8hmLQq9ZLJrR7Jpgm3VDwCb6FJgx9FVPlaSiPXYKLFhDNADc3OvizkJ5samD01oDDlGSp7If9L0hcMP-o7csEP2ct6fV2R3OptWJjNjIztLKxF_I0ImnWiEAgO2Fev5YQswrRIgleY2Rs7gxheeKlvgWskSMc9UzkCuoP2fawHDDlmgCW4Kx9-CeEYNjtgLKBmDcPK-YXcU2IOXO8hP9tQWRhR8ggXlCymDwMFozf2bC4XzptndM'
    },
    {
      id: 2,
      name: 'Sophia Clark',
      specialty: 'Expert of Family Practice',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuw14G_CKB4TosNeKnhsIxlF0KqI8C0HvPHfxyeHq9vBPhPCJc9qQyvN6f8UvTkWdJTA-aMvCoEV7gd8LMzk8SS9dV5W5CqOCjfDGJs4Xmztc6zoeLqh0ihl9Ms0gB5LYIYAAwzxfMliiTGlvdhNe8aLDt3eSH93DxXn1YlYRsYc4vRnw4IOMfOUYsxaGKl1P3DIInVMeA_pRa20Uj12toU-4-ECy-UJ3H2lh21A073-c8xhndShbX03M4g8Z1VPJ-s4ZbiRJO5kOf'
    },
    {
      id: 3,
      name: 'Liam Bennett',
      specialty: 'Expert of Plastic Surgery',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALacbFfxSjTlNhxRJgDzPBjhholoPMjTLy_VNi3URH7YFh8nnYFd5xS08UcAKKe_m0Gz1__xI95V1pCsRsNZ8uktdgIpyZgzvSdBk2jEF5dbOtrcqKN_C976g66tVpmm_0PTle-2TjAMRLA-hAAC58cdFgN8lBKk7IBUtxLZnDHv-q7rp66wmErtHJtbzJ7lCFOtFuXA2F9yrEthhRsAeo_hURA6u1x8IfQ0LFhoO875z4Hq_3JnUT6yiZrSvFjy7TFXeechDQ1hN4'
    }
  ]

  const featuredDestinations = [
    {
      name: 'New York',
      image: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    {
      name: 'Tokyo',
      image: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    {
      name: 'Taipei',
      image: taipeiImage
    },
    {
      name: 'Bangkok',
      image: 'https://images.pexels.com/photos/3355788/pexels-photo-3355788.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    }
  ]

  return (
    <div className="flex flex-col w-full max-w-5xl">
      {/* Search Section */}
      <div className="relative mb-12">
        <input 
          className="input w-full pl-12 pr-4 py-4 text-lg" 
          placeholder="Where to? e.g. Taipei, Tokyo..." 
          type="text"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-[var(--text-secondary)]">
          <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </div>
      </div>

      {/* Featured Guides Section */}
      <section>
        <h2 className="typography_h2">Featured Guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredGuides.map((guide) => (
            <div key={guide.id} className="card rounded-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
              <div 
                className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover saturate-3 group-hover:saturate-100 transition-all duration-300" 
                style={{backgroundImage: `url("${guide.image}")`}}
              ></div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">{guide.name}</h3>
                <p className="typography_body">{guide.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="mt-16">
        <h2 className="typography_h2">Featured Destinations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredDestinations.map((destination, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
              <div 
                className="w-full bg-center bg-no-repeat aspect-video bg-cover saturate-3 group-hover:saturate-100 transition-all duration-300" 
                style={{backgroundImage: `url("${destination.image}")`}}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <h3 className="text-xl font-bold text-white drop-shadow-lg">{destination.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home