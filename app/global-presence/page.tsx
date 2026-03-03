import Accordion from "../components/Accordion"
import MapPreview from "../components/MapPreview"

export default function GlobalPresence() {
  return (
    <main className="bg-[#1C2340] min-h-screen">

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

            <MapPreview />
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
      <section id="global-map" className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-3xl font-serif text-white mb-4">Global Map</h2>
          <div className="w-16 h-[1px] bg-[#C5A85C] mx-auto mb-12" />

          <div className="border border-[#C5A85C]/20 bg-[#1a203a] p-12">
            <p className="text-[#C9CCD6]">
              Interactive world map will be integrated here.
            </p>
          </div>
        </div>
      </section>

      {/* GATHERINGS */}
      <section id="gatherings" className="py-24 px-6 md:px-12 lg:px-24 bg-[#242B4A]">
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
      </section>

    </main>
  )
}