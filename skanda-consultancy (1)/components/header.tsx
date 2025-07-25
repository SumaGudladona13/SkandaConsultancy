"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail } from "lucide-react"
import Link from "next/link"

function getAuthInfo() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token")
    if (!token) return { isAuth: false, isAdmin: false }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      return { isAuth: true, isAdmin: payload.role === "admin" }
    } catch {
      return { isAuth: false, isAdmin: false }
    }
  }
  return { isAuth: false, isAdmin: false }
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [auth, setAuth] = useState({ isAuth: false, isAdmin: false })

  useEffect(() => {
    setAuth(getAuthInfo())
    window.addEventListener("storage", () => setAuth(getAuthInfo()))
    return () => window.removeEventListener("storage", () => setAuth(getAuthInfo()))
  }, [])

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="hidden md:flex items-center justify-between py-2 text-sm text-gray-600 border-b">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>info@skandaconsultancy.com</span>
            </div>
          </div>
          <div className="text-sm">
            <span className="text-green-600 font-medium">●</span> Available 24/7
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Skanda
              <span className="text-gray-800 ml-1">Consultancy</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#home" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="#services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Services
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </Link>
            <Link href="#testimonials" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Testimonials
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {!auth.isAuth ? (
              <>
                <Link href="/login">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent">Sign Up</Button>
                </Link>
              </>
            ) : (
              <>
                {auth.isAdmin && (
                  <Link href="/admin">
                    <Button className="bg-purple-600 hover:bg-purple-700">Admin Dashboard</Button>
                  </Link>
                )}
                <Link href="/profile">
                  <Button className="bg-blue-600 hover:bg-blue-700">Profile</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="#home" className="text-gray-700 hover:text-blue-600 font-medium">
                Home
              </Link>
              <Link href="#services" className="text-gray-700 hover:text-blue-600 font-medium">
                Services
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-blue-600 font-medium">
                About
              </Link>
              <Link href="#testimonials" className="text-gray-700 hover:text-blue-600 font-medium">
                Testimonials
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">
                Contact
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                {!auth.isAuth ? (
                  <>
                    <Link href="/login">
                      <Button variant="outline" className="border-blue-600 text-blue-600 bg-transparent">Login</Button>
                    </Link>
                    <Link href="/signup">
                      <Button variant="outline" className="border-green-600 text-green-600 bg-transparent">Sign Up</Button>
                    </Link>
                  </>
                ) : (
                  <>
                    {auth.isAdmin && (
                      <Link href="/admin">
                        <Button className="bg-purple-600 hover:bg-purple-700">Admin Dashboard</Button>
                      </Link>
                    )}
                    <Link href="/profile">
                      <Button className="bg-blue-600 hover:bg-blue-700">Profile</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
