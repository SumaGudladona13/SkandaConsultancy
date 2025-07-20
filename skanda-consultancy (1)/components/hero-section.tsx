"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Building, Users } from "lucide-react"

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [location, setLocation] = useState("")

  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Find Your Perfect
                <span className="text-blue-600 block">Consultancy Solution</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Expert consultancy services tailored to your business needs. From strategy to implementation, we've got
                you covered.
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search for services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                </div>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger className="h-12 border-gray-200">
                    <SelectValue placeholder="Service Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business">Business Strategy</SelectItem>
                    <SelectItem value="financial">Financial Advisory</SelectItem>
                    <SelectItem value="hr">HR Consulting</SelectItem>
                    <SelectItem value="it">IT Solutions</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="h-12 border-gray-200">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full mt-4 h-12 bg-blue-600 hover:bg-blue-700 text-lg font-medium">
                Search Services
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-600">Expert Consultants</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/placeholder.svg?height=600&width=500"
                alt="Consultancy Services"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg z-20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Building className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Business Growth</div>
                  <div className="text-xs text-gray-500">+25% Average</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg z-20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Client Satisfaction</div>
                  <div className="text-xs text-gray-500">98% Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
