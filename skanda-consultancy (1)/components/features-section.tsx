import { CheckCircle, Clock, Shield, Award, Headphones, Globe } from "lucide-react"

const features = [
  {
    icon: CheckCircle,
    title: "Proven Track Record",
    description: "Over 500+ successful projects delivered with 98% client satisfaction rate.",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Fast and efficient service delivery without compromising on quality.",
  },
  {
    icon: Shield,
    title: "Secure & Confidential",
    description: "Your business data and strategies are completely secure with us.",
  },
  {
    icon: Award,
    title: "Industry Experts",
    description: "Team of certified professionals with 15+ years of industry experience.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock support to ensure your business never stops growing.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Serving clients across multiple countries with local expertise.",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Skanda Consultancy?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine expertise, innovation, and dedication to deliver exceptional consultancy services that drive real
            business results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="group text-center p-6 rounded-2xl hover:bg-blue-50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                  <IconComponent className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
