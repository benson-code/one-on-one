import React from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'

function Home() {

  const featuredGuides = [
    {
      id: 1,
      name: 'Ethan Carter',
      specialty: 'Expert in local history and culture',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJLzlS7ubnGckKEhFmdL5GW07p8hmLQq9ZLJrR7Jpgm3VDwCb6FJgx9FVPlaSiPXYKLFhDNADc3OvizkJ5samD01oDDlGSp7If9L0hcMP-o7csEP2ct6fV2R3OptWJjNjIztLKxF_I0ImnWiEAgO2Fev5YQswrRIgleY2Rs7gxheeKlvgWskSMc9UzkCuoP2fawHDDlmgCW4Kx9-CeEYNjtgLKBmDcPK-YXcU2IOXO8hP9tQWRhR8ggXlCymDwMFozf2bC4XzptndM'
    },
    {
      id: 2,
      name: 'Sophia Clark',
      specialty: 'Specializes in food and wine tours',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuw14G_CKB4TosNeKnhsIxlF0KqI8C0HvPHfxyeHq9vBPhPCJc9qQyvN6f8UvTkWdJTA-aMvCoEV7gd8LMzk8SS9dV5W5CqOCjfDGJs4Xmztc6zoeLqh0ihl9Ms0gB5LYIYAAwzxfMliiTGlvdhNe8aLDt3eSH93DxXn1YlYRsYc4vRnw4IOMfOUYsxaGKl1P3DIInVMeA_pRa20Uj12toU-4-ECy-UJ3H2lh21A073-c8xhndShbX03M4g8Z1VPJ-s4ZbiRJO5kOf'
    },
    {
      id: 3,
      name: 'Liam Bennett',
      specialty: 'Adventure and outdoor activities',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALacbFfxSjTlNhxRJgDzPBjhholoPMjTLy_VNi3URH7YFh8nnYFd5xS08UcAKKe_m0Gz1__xI95V1pCsRsNZ8uktdgIpyZgzvSdBk2jEF5dbOtrcqKN_C976g66tVpmm_0PTle-2TjAMRLA-hAAC58cdFgN8lBKk7IBUtxLZnDHv-q7rp66wmErtHJtbzJ7lCFOtFuXA2F9yrEthhRsAeo_hURA6u1x8IfQ0LFhoO875z4Hq_3JnUT6yiZrSvFjy7TFXeechDQ1hN4'
    }
  ]

  const featuredDestinations = [
    {
      name: 'Paris',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8qfaN11KR7IiA7EQLDoyJxjawHXNxzU2CNFmJbDPCv9f3vHIUEXfvC9FIlOtRrmqne7k4pXe6t5yQ5m4xQE3mS-fm4BfES-iaaac76Bfhem4ScLBKXoGLG4QH2xzkyPhOpJKPxIzlHuO2ov6Pr-PnCcWIzAL11ZECnAO6gd3Cfgs_do3VQVqUegIUO0HCvPZ2abpX74oPp_fr2MOb-fHSQm2ap0VokYTZvHi7mHfOEj7z_Lr0oVJFZ4-6m0WQxRApirtXXcOjkuk0'
    },
    {
      name: 'Tokyo',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZc2036SqXGKT4wywd6NtmlsUu1Ivp7tde-xh7Mah_FGyQhD3CV8Vb45ELSN-cxSwC-2itEK9-MB4hW4OWds3udC7i5ix-h_u-Kgb2WhBGNhGcTnFeSrw-yh4BbtJzzw6mpor92cHJetruKn_EdVzb_bUlM1bhvhlShLETAj5_m92bZ78J60wf8KEotXphVnNv45gy7NNjR6bdfKH2P_VCco7jPHkyG8XF8gMgjCLMRwzyGuFvl5ErrslqhJ-aTi8zlCi8ihRWWS3i'
    },
    {
      name: 'New York',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ9eGiUGMksqgdRIzVMNSwvaK1laYpLNwsksDfM7t2VX6Ftllli1mKDOP4gnqZXNhVebTJ1WAuvkM19znNNLHFgXYhl7vaRLUenSJBdY3gu-xzdmG-rpsOo5sCk_t1A3kXC67RjERDXIihfnJa4VjpW2hP-21y-GCuZWp5316SoVgn4rXM153Hq6CjC6cuNpvc7nAdyGyTCH1NxJpwMiNH4S3rxZ6JRfjkjrm3rZ3yJyF_Ocup4xL6WefzDfb0jocgGYOib62fc4cx'
    },
    {
      name: 'Rome',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_dW1_smdX2koviezag9rOT-PaUy2RxWc0_GxEX6iFlzsYTcK-f854gTA_jkU-ss-3ROC1GT0jTopondL4abKoqoeZV2nBYyt9aLJtNtM3Zozqex8ZZ9JdEKYNfUI2HBhUJ2312Lz8nSaxpEx9CKJgX8iM0BkMpyPv3Jq7qZXo_q3Ht4LiJghgjca6r1ydaUUyDNmdNWlmicGc94O6Nq791qkDCwaHmOqMksjCaI4GDsxX8IuLhyKP6PnLwn4kYdX-pFyo__19OJJu'
    }
  ]

  return (
    <div className="flex flex-col w-full max-w-5xl">
      {/* Search Section */}
      <div className="relative mb-12">
        <input 
          className="input w-full pl-12 pr-4 py-4 text-lg" 
          placeholder="Where to? e.g., Paris, Tokyo, or New York" 
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
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                <h3 className="text-xl font-bold text-white">{destination.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home