Nimrod Estate Group




      Leadership Team
<section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="font-heading text-4xl font-bold mb-4">
        Leadership <span className="text-primary">Team</span>
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Meet the experienced professionals guiding Nimrod Estates to new heights
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {team.map((member, index) => (
        <div key={index} className="group bg-white overflow-hidden shadow-lg hover-lift border-2 border-gray-100 relative">
          {/* Image Container - Increased Height */}
          <div className="relative overflow-hidden h-96">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            />
            
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="font-heading text-lg font-semibold text-white mb-1">
                {member.name}
              </h3>
              <p className="text-primary text-sm font-medium">
                {member.title}
              </p>
            </div>
          </div>

         
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
            <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="font-heading text-xl font-semibold mb-2 text-white">
                {member.name}
              </h3>
              <p className="text-primary text-sm font-medium mb-4">
                {member.title}
              </p>
              <div className="pt-4 border-t border-primary/30">
                <p className="text-white/80 text-sm leading-relaxed">
                  Experienced professional with expertise in luxury real estate investment and portfolio management.
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>











      {/* Leadership Team */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="font-heading text-4xl font-bold mb-4">
        Leadership <span className="text-primary">Team</span>
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Meet the experienced professionals guiding Nimrod Estates to new heights
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {team.map((member, index) => (
        <div key={index} className="group bg-white overflow-hidden shadow-lg hover-lift border-2 border-gray-100 relative">
          {/* Image Container - Increased Height */}
          <div className="relative overflow-hidden h-96">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            />
            
            {/* Name and Title - Always Visible at Bottom of Image */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="font-heading text-lg font-semibold text-white mb-1">
                {member.name}
              </h3>
              <p className="text-primary text-sm font-medium">
                {member.title}
              </p>
            </div>
          </div>

          {/* Details Overlay - Appears on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
            <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="font-heading text-xl font-semibold mb-2 text-white">
                {member.name}
              </h3>
              <p className="text-primary text-sm font-medium mb-4">
                {member.title}
              </p>
              <div className="pt-4 border-t border-primary/30">
                <p className="text-white/80 text-sm leading-relaxed">
                  Experienced professional with expertise in luxury real estate investment and portfolio management.
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>