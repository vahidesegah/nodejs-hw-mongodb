import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginJs from '@eslint/js';


  
export default [
    pluginJs.configs.recommended,
    {
      files: ['src/**/*.js'],
      languageOptions: { globals: globals.node },
      rules: { 
          semi: 'error', 
          'no-unused-vars': ['error', { args: 'none' }], 
          'no-undef': 'error' 
        },
    },
  ];
  