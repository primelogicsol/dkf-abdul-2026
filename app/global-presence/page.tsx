import Accordion from "../components/Accordion"
import MapPreview from "../components/MapPreview"
import PremiumHeader from "../components/PremiumHeader";
import PremiumFooter from "../components/PremiumFooter";

export default function GlobalPresence() {
  return (
    
    <main className="bg-[#1C2340] min-h-screen">
      <PremiumHeader/>

      {/* HEADER */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#242B4A]">
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Global Presence
          </h1>
          <div className="w-24 h-[1px] bg-[#C5A85C] mx-auto mb-8" />
          <p className="text-[#C9CCD6] text-lg leading-relaxed max-w-3xl mx-auto">
            Participants are located across multiple regions through documented
            meetings and structured engagement. Geographic continuity is preserved
            through archival records.
          </p>
        </div>
      </section>

      {/* OVERVIEW */}
      <section id="overview" className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif text-white mb-4">Overview</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mb-6" />
              <p className="text-[#C9CCD6] leading-relaxed">
                Engagement is distributed. Individuals across regions have connected
                through documented participation and coordinated discussion. This
                section records geographic presence without hierarchy or scale emphasis.
              </p>
            </div>

            
          </div>
        </div>
      </section>

      {/* REGIONS */}
      <section id="regions" className="py-24 px-6 md:px-12 lg:px-24 bg-[#242B4A]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-serif text-white mb-4">Regions</h2>
          <div className="w-16 h-[1px] bg-[#C5A85C] mb-12" />

          <Accordion />
        </div>
      </section>

      {/* GLOBAL MAP PLACEHOLDER */}
      {/* <section id="global-map" className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-3xl font-serif text-white mb-4">Global Map</h2>
          <div className="w-16 h-[1px] bg-[#C5A85C] mx-auto mb-12" />

          <div className="border border-[#C5A85C]/20 bg-[#1a203a] p-12">
            <p className="text-[#C9CCD6]">
              Interactive world map will be integrated here.
            </p>
          </div>
        </div>
      </section> */}

      {/* GATHERINGS */}
      {/* <section id="gatherings" className="py-24 px-6 md:px-12 lg:px-24 bg-[#242B4A]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-serif text-white mb-4">Gatherings</h2>
          <div className="w-16 h-[1px] bg-[#C5A85C] mb-12" />

          <div className="space-y-8">
            <div>
              <h3 className="text-[#C5A85C] text-lg font-serif mb-1">2023</h3>
              <p className="text-[#C9CCD6]">London, United Kingdom</p>
              <p className="text-[#C9CCD6]/70 text-sm mt-1">
                Documented regional dialogue session.
              </p>
            </div>

            <div>
              <h3 className="text-[#C5A85C] text-lg font-serif mb-1">2022</h3>
              <p className="text-[#C9CCD6]">Srinagar, India</p>
              <p className="text-[#C9CCD6]/70 text-sm mt-1">
                Archival review and structured meeting.
              </p>
            </div>
          </div>
        </div>
      </section> */}
      <section id="gatherings" className="py-24 px-6 md:px-12 lg:px-24 ">
  <div className="max-w-[1200px] mx-auto">
    <h2 className="text-3xl font-serif text-white mb-4">Gatherings</h2>
    <div className="w-16 h-[1px] bg-[#C5A85C] mb-12" />

    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

      {/* United States */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif text-[#C5A85C]">United States</h3>

        <div>
          <p className="text-white font-medium">2024</p>
          <p className="text-[#C9CCD6]">Washington D.C., United States</p>
          <p className="text-[#C9CCD6]/70 text-sm">
            Circle discussion on documenting contemporary spiritual reflections.
          </p>
        </div>

        <div>
          <p className="text-white font-medium">2023</p>
          <p className="text-[#C9CCD6]">New York, United States</p>
          <p className="text-[#C9CCD6]/70 text-sm">
            Regional gathering of seekers exploring knowledge and ethics.
          </p>
        </div>

        <div>
          <p className="text-white font-medium">2022</p>
          <p className="text-[#C9CCD6]">California, United States</p>
          <p className="text-[#C9CCD6]/70 text-sm">
            Small circle meeting on preserving teachings through structured archives.
          </p>
        </div>
      </div>

      {/* India */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif text-[#C5A85C]">India</h3>

        <div>
          <p className="text-white font-medium">2024</p>
          <p className="text-[#C9CCD6]">Srinagar, India</p>
          <p className="text-[#C9CCD6]/70 text-sm">
            Reflection gathering with seekers reviewing archival work.
          </p>
        </div>

        <div>
          <p className="text-white font-medium">2023</p>
          <p className="text-[#C9CCD6]">New Delhi, India</p>
          <p className="text-[#C9CCD6]/70 text-sm">
            Dialogue on knowledge, spirituality, and contemporary society.
          </p>
        </div>

        <div>
          <p className="text-white font-medium">2022</p>
          <p className="text-[#C9CCD6]">Srinagar, India</p>
          <p className="text-[#C9CCD6]/70 text-sm">
            Structured meeting on documentation of teachings.
          </p>
        </div>
      </div>

      {/* Europe */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif text-[#C5A85C]">Europe</h3>

        <div>
          <p className="text-white font-medium">2024</p>
          <p className="text-[#C9CCD6]">Paris, France</p>
          <p className="text-[#C9CCD6]/70 text-sm">
            Regional dialogue on spiritual traditions and modern inquiry.
          </p>
        </div>

        <div>
          <p className="text-white font-medium">2023</p>
          <p className="text-[#C9CCD6]">London, United Kingdom</p>
          <p className="text-[#C9CCD6]/70 text-sm">
            Documented regional dialogue session.
          </p>
        </div>

        <div>
          <p className="text-white font-medium">2022</p>
          <p className="text-[#C9CCD6]">Berlin, Germany</p>
          <p className="text-[#C9CCD6]/70 text-sm">
            Gathering of seekers reflecting on knowledge and responsibility.
          </p>
        </div>
      </div>

      {/* Middle East */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif text-[#C5A85C]">Middle East</h3>

        <div>
          <p className="text-white font-medium">2024</p>
          <p className="text-[#C9CCD6]">Dubai, United Arab Emirates</p>
          <p className="text-[#C9CCD6]/70 text-sm">
            Circle discussion on spiritual knowledge and global participation.
          </p>
        </div>

        <div>
          <p className="text-white font-medium">2023</p>
          <p className="text-[#C9CCD6]">Doha, Qatar</p>
          <p className="text-[#C9CCD6]/70 text-sm">
            Regional meeting of seekers and contributors.
          </p>
        </div>

        <div>
          <p className="text-white font-medium">2022</p>
          <p className="text-[#C9CCD6]">Istanbul, Türkiye</p>
          <p className="text-[#C9CCD6]/70 text-sm">
            Dialogue on Sufi tradition and intellectual heritage.
          </p>
        </div>
      </div>

      {/* Australia */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif text-[#C5A85C]">Australia</h3>

        <div>
          <p className="text-white font-medium">2024</p>
          <p className="text-[#C9CCD6]">Sydney, Australia</p>
          <p className="text-[#C9CCD6]/70 text-sm">
            Regional gathering of seekers documenting reflections.
          </p>
        </div>

        <div>
          <p className="text-white font-medium">2023</p>
          <p className="text-[#C9CCD6]">Melbourne, Australia</p>
          <p className="text-[#C9CCD6]/70 text-sm">
            Discussion on preserving spiritual teachings across continents.
          </p>
        </div>

        <div>
          <p className="text-white font-medium">2022</p>
          <p className="text-[#C9CCD6]">Brisbane, Australia</p>
          <p className="text-[#C9CCD6]/70 text-sm">
            Circle meeting on knowledge and community engagement.
          </p>
        </div>
      </div>

      {/* South America */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif text-[#C5A85C]">South America</h3>

        <div>
          <p className="text-white font-medium">2024</p>
          <p className="text-[#C9CCD6]">São Paulo, Brazil</p>
          <p className="text-[#C9CCD6]/70 text-sm">
            Regional dialogue among seekers and scholars.
          </p>
        </div>

        <div>
          <p className="text-white font-medium">2023</p>
          <p className="text-[#C9CCD6]">Buenos Aires, Argentina</p>
          <p className="text-[#C9CCD6]/70 text-sm">
            Gathering focused on cross-cultural spiritual dialogue.
          </p>
        </div>

        <div>
          <p className="text-white font-medium">2022</p>
          <p className="text-[#C9CCD6]">Santiago, Chile</p>
          <p className="text-[#C9CCD6]/70 text-sm">
            Circle meeting discussing documentation of teachings.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>
      <PremiumFooter />
    </main>
    
  )
}