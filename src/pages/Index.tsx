
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "@/utils/mockData";
import { PageTransition } from "@/components/ui/page-transition";
import MainLayout from "@/components/layout/MainLayout";
import { ProductCard } from "@/components/product/ProductCard";
import { FeaturedProduct } from "@/components/product/FeaturedProduct";
import { Button } from "@/components/ui/button";

const Index = () => {
  const featuredProduct = products[0];
  const topProducts = products.slice(1, 4);

  return (
    <MainLayout>
      <PageTransition>
        {/* Hero Section */}
        <section className="relative py-16 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="inline-block px-3 py-1 mb-6 text-sm font-medium bg-primary/10 text-primary rounded-full"
              >
                Welcome to élite
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="heading-1 mb-6"
              >
                Elevate Your Experience with Premium Design
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="paragraph mb-8 max-w-2xl"
              >
                Discover a curated collection of exceptional products crafted with precision and delivered with care. 
                Experience the perfect blend of form and function.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Button asChild size="lg">
                  <Link to="/products">
                    Explore Products <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link to="/stores">Find Stores</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Product Section */}
        <section className="py-16 bg-accent/50">
          <div className="container mx-auto px-4">
            <h2 className="heading-2 mb-8 text-center">Featured Product</h2>
            <FeaturedProduct product={featuredProduct} />
          </div>
        </section>

        {/* Top Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="heading-2">Top Products</h2>
                <p className="paragraph mt-2">Discover our most popular items</p>
              </div>
              <Button variant="ghost" asChild>
                <Link to="/products">
                  View all <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="product-grid">
              {topProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-accent/50">
          <div className="container mx-auto px-4">
            <h2 className="heading-2 mb-12 text-center">Why Choose Us</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Premium Quality",
                  description: "Carefully selected products that meet our high standards for design, durability, and performance.",
                  icon: "✦"
                },
                {
                  title: "Fast Delivery",
                  description: "Express shipping options with real-time tracking to keep you informed every step of the way.",
                  icon: "✦"
                },
                {
                  title: "Exceptional Service",
                  description: "Dedicated support team ready to assist with any questions or concerns about your purchase.",
                  icon: "✦"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="glass-card p-8 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="glass-card bg-primary/5 p-8 md:p-12 text-center max-w-4xl mx-auto">
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="heading-2 mb-4"
              >
                Ready to elevate your experience?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="paragraph mb-8 max-w-2xl mx-auto"
              >
                Join our community of design enthusiasts and be the first to know about new products, exclusive offers, and inspiring content.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <Button asChild size="lg">
                  <Link to="/products">
                    Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </PageTransition>
    </MainLayout>
  );
};

export default Index;
