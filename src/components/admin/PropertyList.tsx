import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';

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
  if (properties.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No properties found. Create your first property listing above.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((property) => (
        <Card key={property.id}>
          <CardContent className="p-4">
            {property.images?.[0] && (
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
                {property.featured && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{property.location}</p>
              <p className="text-lg font-bold text-primary">{property.price}</p>
              <p className="text-sm text-muted-foreground">
                {property.type} • {property.bedrooms} beds • {property.bathrooms} baths
              </p>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(property)}
                  className="flex-1"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(property.id)}
                  className="flex-1"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
