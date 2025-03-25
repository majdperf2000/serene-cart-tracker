
import React from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/ui/page-transition";
import MainLayout from "@/components/layout/MainLayout";
import ControlPanelsLayout from "@/components/controlPanel/ControlPanelsLayout";

const ControlPanels = () => {
  return (
    <MainLayout>
      <PageTransition>
        <ControlPanelsLayout />
      </PageTransition>
    </MainLayout>
  );
};

export default ControlPanels;
