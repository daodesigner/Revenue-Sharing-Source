import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const usePasswordVisibility = () => {
   const [showPassword, setShowPassword] = useState(false);

   const PasswordToggle = () => (
      <button
         type="button"
         onClick={() => setShowPassword(!showPassword)}
         className="absolute right-3 top-9 text-neutral-500 hover:text-neutral-900"
         aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
         {showPassword ? (
            <EyeOff className="h-5 w-5" />
         ) : (
            <Eye className="h-5 w-5" />
         )}
      </button>
   );

   return {
      showPassword,
      PasswordToggle,
      inputType: showPassword ? 'text' : 'password',
   };
};
