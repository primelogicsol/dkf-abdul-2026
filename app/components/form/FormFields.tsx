"use client";

import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-[#C9CCD6] text-sm font-medium">
          {label}
        </label>
        <input
          ref={ref}
          className={`w-full bg-[#1C2340] border ${
            error ? 'border-red-500/40' : 'border-white/20'
          } px-4 py-3 text-white placeholder-[#AAB3CF]/50 focus:outline-none focus:border-[#C5A85C]/60 rounded-lg transition-colors ${className}`}
          {...props}
        />
        {error && (
          <p className="text-red-400 text-xs">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-[#C9CCD6] text-sm font-medium">
          {label}
        </label>
        <textarea
          ref={ref}
          className={`w-full bg-[#1C2340] border ${
            error ? 'border-red-500/40' : 'border-white/20'
          } px-4 py-3 text-white placeholder-[#AAB3CF]/50 focus:outline-none focus:border-[#C5A85C]/60 rounded-lg transition-colors resize-none ${className}`}
          {...props}
        />
        {error && (
          <p className="text-red-400 text-xs">{error}</p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const FormSelect = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-[#C9CCD6] text-sm font-medium">
          {label}
        </label>
        <select
          ref={ref}
          className={`w-full bg-[#1C2340] border ${
            error ? 'border-red-500/40' : 'border-white/20'
          } px-4 py-3 text-white focus:outline-none focus:border-[#C5A85C]/60 rounded-lg transition-colors ${className}`}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-red-400 text-xs">{error}</p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormCheckbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            ref={ref}
            type="checkbox"
            className="w-5 h-5 mt-0.5 accent-[#C5A85C] rounded"
            {...props}
          />
          <span className="text-[#C9CCD6] text-sm">{label}</span>
        </label>
        {error && (
          <p className="text-red-400 text-xs">{error}</p>
        )}
      </div>
    );
  }
);

FormCheckbox.displayName = "FormCheckbox";

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  accept?: string;
}

export const FormFileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, error, accept, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-[#C9CCD6] text-sm font-medium">
          {label}
        </label>
        <input
          ref={ref}
          type="file"
          accept={accept}
          className={`w-full bg-[#1C2340] border ${
            error ? 'border-red-500/40' : 'border-white/20'
          } px-4 py-3 text-white focus:outline-none focus:border-[#C5A85C]/60 rounded-lg transition-colors file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#C5A85C]/20 file:text-[#C5A85C] file:hover:bg-[#C5A85C]/30`}
          {...props}
        />
        {error && (
          <p className="text-red-400 text-xs">{error}</p>
        )}
      </div>
    );
  }
);

FormFileInput.displayName = "FormFileInput";
