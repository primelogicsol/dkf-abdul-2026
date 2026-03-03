"use client";

import { motion } from "framer-motion";

interface ImpactDiagramProps {
  steps: { title: string; description: string }[];
  title?: string;
}

export default function ImpactDiagram({ steps, title }: ImpactDiagramProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {title && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="font-serif text-2xl text-white mb-4">{title}</h3>
          <div className="gold-divider mx-auto" />
        </motion.div>
      )}

      <div className="space-y-0">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 * (index + 1) }}
            className="relative"
          >
            <div className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-6 mb-4">
              <h4 className="font-serif text-lg text-white mb-2">{step.title}</h4>
              <p className="text-[#AAB3CF] text-sm leading-relaxed">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="flex justify-center py-2">
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#C5A85C]/50 to-[#C5A85C]/20" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
