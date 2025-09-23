import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye, ImageIcon } from "lucide-react";
import { useState } from "react";
const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const galleryImages = [{
    src: "/lovable-uploads/clinic-exterior-new.png",
    name: "Clinic Exterior View",
    category: "Facility"
  }, {
    src: "/lovable-uploads/waiting-area-new.png",
    name: "Waiting Area",
    category: "Facility"
  }, {
    src: "/lovable-uploads/medical-doctor.jpg",
    name: "Medical Doctor",
    category: "Team"
  }, {
    src: "/lovable-uploads/3f2ea8ce-8e6d-4383-9fce-900ffef57f89.png",
    name: "Patient Reception Service",
    category: "Services"
  }, {
    src: "/lovable-uploads/scientist-at-work.png",
    name: "Scientist at work",
    category: "Services"
  }, {
    src: "/lovable-uploads/hematology-department.png",
    name: "Hematology Department",
    category: "Services"
  }, {
    src: "/lovable-uploads/microbiology-department.png",
    name: "Microbiology Department",
    category: "Services"
  }, {
    src: "/lovable-uploads/xray-department.png",
    name: "Radiographer at work/X-ray Department",
    category: "Services"
  }, {
    src: "/lovable-uploads/ultrasound-department.jpg",
    name: "Ultrasound Department",
    category: "Services"
  }, {
    src: "/lovable-uploads/chemistry-department-1.jpg",
    name: "Chemistry Department",
    category: "Services"
  }, {
    src: "/lovable-uploads/chemistry-department-2.jpg",
    name: "Chemistry Department",
    category: "Services"
  }, {
    src: "/lovable-uploads/b37e74d6-ddb5-4e25-ac78-9c8350905184.png",
    name: "Medical Team Photo",
    category: "Team"
  }];
  const categories = ["All", ...new Set(galleryImages.map(img => img.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredImages = selectedCategory === "All" ? galleryImages : galleryImages.filter(img => img.category === selectedCategory);
  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };
  const closeModal = () => {
    setSelectedImage(null);
  };
  const downloadImage = (src: string, name: string) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = name;
    link.click();
  };
  return <section id="gallery" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Medical Gallery</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our state-of-the-art medical facility, advanced equipment, and professional healthcare team
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <div className="relative aspect-square overflow-hidden">
                <img src={image.src} alt={image.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <Badge className="mb-2 bg-white/20 text-white border-white/30">
                          {image.category}
                        </Badge>
                        <h3 className="text-white font-semibold text-sm leading-tight">
                          {image.name}
                        </h3>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" onClick={() => handleImageClick(image.src)} className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => downloadImage(image.src, image.name)} className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                      {image.name}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {image.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>

        {filteredImages.length === 0 && <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No images found</h3>
            <p className="text-muted-foreground">Try selecting a different category</p>
          </div>}

        {/* Image Modal */}
        {selectedImage && <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={closeModal}>
            <div className="relative max-w-4xl max-h-full">
              <img src={selectedImage} alt="Selected gallery image" className="max-w-full max-h-full object-contain rounded-lg" onClick={e => e.stopPropagation()} />
              <Button variant="secondary" size="sm" onClick={closeModal} className="absolute top-4 right-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
                ✕
              </Button>
            </div>
          </div>}
      </div>
    </section>;
};
export default Gallery;