// src/pages/services/DevelopmentForm.tsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Home, Building, Hammer, DollarSign, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import heroImage from '@/assets/neo-brutalism-inspired-building.jpg';

const DevelopmentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Package types with their budget ranges
  const packageTypes = [
    {
      id: 'starter',
      name: 'Starter Homes & Renovations',
      range: 'R200,000 - R1 Million',
      min: 200000,
      max: 1000000,
      icon: Home,
      budgetOptions: [
        'R200,000 - R400,000',
        'R400,000 - R600,000',
        'R600,000 - R800,000',
        'R800,000 - R1 Million'
      ]
    },
    {
      id: 'mid-range',
      name: 'Mid-Range Residential',
      range: 'R1 Million - R5 Million',
      min: 1000000,
      max: 5000000,
      icon: Building,
      budgetOptions: [
        'R1 Million - R2 Million',
        'R2 Million - R3 Million',
        'R3 Million - R4 Million',
        'R4 Million - R5 Million'
      ]
    },
    {
      id: 'luxury',
      name: 'Luxury Residential',
      range: 'R5 Million - R20 Million',
      min: 5000000,
      max: 20000000,
      icon: Hammer,
      budgetOptions: [
        'R5 Million - R10 Million',
        'R10 Million - R15 Million',
        'R15 Million - R20 Million'
      ]
    },
    {
      id: 'enterprise',
      name: 'Large-Scale Developments',
      range: 'R20 Million - R1 Billion',
      min: 20000000,
      max: 1000000000,
      icon: DollarSign,
      budgetOptions: [
        'R20 Million - R50 Million',
        'R50 Million - R100 Million',
        'R100 Million - R500 Million',
        'R500 Million - R1 Billion'
      ]
    }
  ];

  // Form state
  const [formData, setFormData] = useState({
    packageType: '',
    fullName: '',
    email: '',
    phone: '',
    budgetRange: '',
    projectDescription: '',
    propertyType: '',
    timeline: '',
    location: '',
    plotSize: '',
    currentStage: ''
  });

  // Get package from URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const packageParam = searchParams.get('package');
    
    if (packageParam) {
      const selectedPackage = packageTypes.find(pkg => pkg.id === packageParam);
      if (selectedPackage) {
        setFormData(prev => ({
          ...prev,
          packageType: selectedPackage.id
        }));
      }
    }
  }, [location.search]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://back-end.nimrodestates.com/api/PropertyDevelopment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success!",
          description: "Your inquiry has been submitted successfully. We'll contact you within 24 hours.",
          variant: "default",
        });
        
        // Reset form
        setFormData({
          packageType: '',
          fullName: '',
          email: '',
          phone: '',
          budgetRange: '',
          projectDescription: '',
          propertyType: '',
          timeline: '',
          location: '',
          plotSize: '',
          currentStage: ''
        });
        
        // Redirect after success
        setTimeout(() => {
          navigate('/services/property-development');
        }, 2000);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit your inquiry. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPackage = packageTypes.find(pkg => pkg.id === formData.packageType);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
{/* 
      {/* Header */}
{/* Hero Section */}
<section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: `url(${heroImage})`, // Ensure heroImage is a valid variable
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
  </div>

  <div className="relative z-10 container mx-auto px-4 text-center text-white">
    <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
      Get in <span className="text-gradient-gold">Touch</span>
    </h1>
    <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
     Tell us about your development project and we'll get back to you with a customized proposal
    </p>
     <div className="text-center">
      <div>
  </div>
  </div>
  </div>
</section>


  <div className="container mx-auto px-6 py-8">
    <Button
      variant="ghost"
      onClick={() => navigate('/services/property-development')}
      className="mb-6"
    >
      {/* Uncomment if you want to show the back button icon */}
      {/* <ArrowLeft className="mr-2" size={16} /> */}
      {/* Back to Property Development */}
    </Button>

    <div className="text-center">
     
      
    </div>
  </div>




      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Package Type */}
                  <div className="space-y-4">
                    <label className="text-lg font-semibold text-gray-900">
                      Selected Package Type *
                    </label>
                    <Select
                      value={formData.packageType}
                      onValueChange={(value) => handleInputChange('packageType', value)}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a package type" />
                      </SelectTrigger>
                      <SelectContent>
                        {packageTypes.map((pkg) => {
                          const Icon = pkg.icon;
                          return (
                            <SelectItem key={pkg.id} value={pkg.id}>
                              <div className="flex items-center">
                                <Icon className="mr-2" size={16} />
                                {pkg.name} ({pkg.range})
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Full Name *</label>
                      <Input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email Address *</label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                      <Input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Project Location</label>
                      <Input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="Where is your project located?"
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Property Type *</label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) => handleInputChange('propertyType', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential Home</SelectItem>
                        <SelectItem value="commercial">Commercial Building</SelectItem>
                        <SelectItem value="mixed-use">Mixed-Use Development</SelectItem>
                        <SelectItem value="renovation">Renovation/Extension</SelectItem>
                        <SelectItem value="estate">Luxury Estate</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Budget Range - Dynamic based on package */}
                  {selectedPackage && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Budget Range *</label>
                      <Select
                        value={formData.budgetRange}
                        onValueChange={(value) => handleInputChange('budgetRange', value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedPackage.budgetOptions.map((option, index) => (
                            <SelectItem key={index} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-500">
                        Package range: {selectedPackage.range}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Plot Size</label>
                      <Input
                        type="text"
                        value={formData.plotSize}
                        onChange={(e) => handleInputChange('plotSize', e.target.value)}
                        placeholder="e.g., 500m², 1 acre"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Project Timeline *</label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(value) => handleInputChange('timeline', value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate Start</SelectItem>
                          <SelectItem value="1-3 months">1-3 Months</SelectItem>
                          <SelectItem value="3-6 months">3-6 Months</SelectItem>
                          <SelectItem value="6-12 months">6-12 Months</SelectItem>
                          <SelectItem value="planning">Still Planning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Current Project Stage *</label>
                    <Select
                      value={formData.currentStage}
                      onValueChange={(value) => handleInputChange('currentStage', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select current stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="idea">Just an Idea</SelectItem>
                        <SelectItem value="planning">Planning Phase</SelectItem>
                        <SelectItem value="design">Design Phase</SelectItem>
                        <SelectItem value="approved">Plans Approved</SelectItem>
                        <SelectItem value="ready">Ready to Build</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Project Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Project Description *
                    </label>
                    <Textarea
                      required
                      value={formData.projectDescription}
                      onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                      placeholder="Please describe your project in detail. Include your vision, specific requirements, and any special features you'd like..."
                      rows={6}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2" size={16} />
                        Submit Inquiry
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-bold mb-4 text-gray-900">
                  What Happens Next?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary/20 text-primary rounded-full p-2 mr-3">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Initial Consultation</h4>
                      <p className="text-sm text-gray-600">We'll contact you within 24 hours to discuss your project</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/20 text-primary rounded-full p-2 mr-3">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Site Assessment</h4>
                      <p className="text-sm text-gray-600">We'll assess your location and provide initial feedback</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/20 text-primary rounded-full p-2 mr-3">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Custom Proposal</h4>
                      <p className="text-sm text-gray-600">Receive a detailed proposal tailored to your needs</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {selectedPackage && (
              <Card className="shadow-lg border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-bold mb-3 text-gray-900">
                    Selected Package
                  </h3>
                  <div className="flex items-center mb-3">
                    <div className="bg-primary/20 p-2 rounded-lg mr-3">
                      {selectedPackage.icon && (
                        <selectedPackage.icon className="text-primary" size={20} />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{selectedPackage.name}</h4>
                      <p className="text-sm text-primary font-medium">{selectedPackage.range}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    This package includes comprehensive services for {selectedPackage.name.toLowerCase()} projects.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DevelopmentForm;