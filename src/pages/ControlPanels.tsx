
import React from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/ui/page-transition";
import MainLayout from "@/components/layout/MainLayout";
import ControlPanelsLayout from "@/components/controlPanel/ControlPanelsLayout";

const ControlPanels = () => {
  return (
    <MainLayout>
      <PageTransition>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-8"
        >
          <ControlPanelsLayout />
        </motion.div>
      </PageTransition>
    </MainLayout>
  );
};

export default ControlPanels;
