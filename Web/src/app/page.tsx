import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Briefcase, BookOpen, Plane, Users, MapPin, DollarSign, Clock, TrendingUp, Award, Globe } from 'lucide-react'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Objectives } from '@/components/sections/Objectives'
import { Architecture } from '@/components/sections/Architecture'
import { Technologies } from '@/components/sections/Technologies'
import { Results } from '@/components/sections/Results'
import { Team } from '@/components/sections/Team'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Objectives Section */}
      <Objectives />

      {/* Architecture Section */}
      <Architecture />

      {/* Technologies Courses */}
      <Technologies />

      {/* Results Section */}
      <Results />

      {/* Team Section */}
      <Team />
      
    </div>
  );
}