// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Edit, Trash2 } from 'lucide-react';

// interface Property {
//   id: string;
//   title: string;
//   location: string;
//   price: string;
//   type: string;
//   bedrooms: number;
//   bathrooms: number;
//   featured: boolean;
//   images: string[];
// }

// interface PropertyListProps {
//   properties: Property[];
//   onEdit: (property: Property) => void;
//   onDelete: (id: string) => void;
// }

// export function PropertyList({ properties, onEdit, onDelete }: PropertyListProps) {
//   if (properties.length === 0) {
//     return (
//       <div className="text-center py-12 text-muted-foreground">
//         No properties found. Create your first property listing above.
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {properties.map((property) => (
//         <Card key={property.id}>
//           <CardContent className="p-4">
//             {property.images?.[0] && (
//               <img
//                 src={property.images[0]}
//                 alt={property.title}
//                 className="w-full h-48 object-cover rounded-lg mb-4"
//               />
//             )}
//             <div className="space-y-2">
//               <div className="flex items-start justify-between">
//                 <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
//                 {property.featured && (
//                   <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
//                     Featured
//                   </span>
//                 )}
//               </div>
//               <p className="text-sm text-muted-foreground">{property.location}</p>
//               <p className="text-lg font-bold text-primary">{property.price}</p>
//               <p className="text-sm text-muted-foreground">
//                 {property.type} • {property.bedrooms} beds • {property.bathrooms} baths
//               </p>
//               <div className="flex gap-2 pt-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => onEdit(property)}
//                   className="flex-1"
//                 >
//                   <Edit className="mr-2 h-4 w-4" />
//                   Edit
//                 </Button>
//                 <Button
//                   variant="destructive"
//                   size="sm"
//                   onClick={() => onDelete(property.id)}
//                   className="flex-1"
//                 >
//                   <Trash2 className="mr-2 h-4 w-4" />
//                   Delete
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }


import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Edit, Trash2, Star, MapPin, Home, Bed, Bath, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  featured: boolean;
  images: string[];
}

interface PropertyListProps {
  properties: Property[];
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
}

export function PropertyList({ properties, onEdit, onDelete }: PropertyListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 30;

  // Filter properties based on search term
  const filteredProperties = useMemo(() => {
    if (!searchTerm) return properties;
    
    const lowercasedSearch = searchTerm.toLowerCase();
    return properties.filter(property =>
      property.title.toLowerCase().includes(lowercasedSearch) ||
      property.location.toLowerCase().includes(lowercasedSearch) ||
      property.type.toLowerCase().includes(lowercasedSearch) ||
      property.price.toLowerCase().includes(lowercasedSearch)
    );
  }, [properties, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const currentProperties = filteredProperties.slice(startIndex, startIndex + propertiesPerPage);

  // Reset to first page when search changes
  useState(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (properties.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground border rounded-lg bg-muted/20">
        <Home className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium mb-2">No properties found</h3>
        <p>Create your first property listing to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-background p-6 border rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search properties by title, location, type, or price..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="whitespace-nowrap">
              Showing {currentProperties.length} of {filteredProperties.length} properties
            </span>
            {searchTerm && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchTerm('')}
                className="whitespace-nowrap"
              >
                Clear Search
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Properties Table */}
      <div className="border rounded-lg overflow-hidden bg-background shadow-sm">
        {/* Table Header */}
        <div className="bg-muted/50 px-6 py-4 border-b">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Home className="h-5 w-5" />
            Property Listings ({filteredProperties.length})
            {searchTerm && (
              <Badge variant="secondary" className="ml-2">
                Filtered
              </Badge>
            )}
          </h3>
        </div>

        {/* Table Container for Responsive Scroll */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left p-4 font-semibold text-sm">PROPERTY</th>
                <th className="text-left p-4 font-semibold text-sm">LOCATION</th>
                <th className="text-left p-4 font-semibold text-sm">TYPE</th>
                <th className="text-left p-4 font-semibold text-sm">DETAILS</th>
                <th className="text-left p-4 font-semibold text-sm">PRICE</th>
                <th className="text-left p-4 font-semibold text-sm">STATUS</th>
                <th className="text-left p-4 font-semibold text-sm">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {currentProperties.map((property) => (
                <tr key={property.id} className="hover:bg-muted/20 transition-colors">
                  {/* Property Info */}
                  <td className="p-4">
                    <div className="flex items-center gap-3 min-w-[250px]">
                      {property.images?.[0] ? (
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-14 h-14 object-cover rounded-lg border"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-muted rounded-lg flex items-center justify-center">
                          <Home className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground truncate max-w-[180px]">
                          {property.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {/* ID: {property.id.slice(0, 8)}... */}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground max-w-[200px]">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{property.location}</span>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="p-4">
                    <Badge variant="outline" className="capitalize">
                      {property.type}
                    </Badge>
                  </td>

                  {/* Details */}
                  <td className="p-4">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{property.bathrooms}</span>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="p-4">
                    <p className="font-bold text-primary text-lg">{property.price}</p>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    {property.featured ? (
                      <Badge className="bg-amber-500 hover:bg-amber-600 flex items-center gap-1 w-fit">
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">
                        Standard
                      </Badge>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(property)}
                        className="h-9 px-3 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(property.id)}
                        className="h-9 px-3 border-red-200 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="border-t bg-muted/20 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(startIndex + propertiesPerPage, filteredProperties.length)} of{' '}
                {filteredProperties.length} properties
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="h-9 px-3"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show pages around current page
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="h-9 w-9 p-0"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="px-2 text-muted-foreground">...</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                        className="h-9 w-9 p-0"
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="h-9 px-3"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}