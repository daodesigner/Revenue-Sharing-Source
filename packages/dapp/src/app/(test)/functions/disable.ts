export const desableButton = (
   response: number | undefined,
   isLoading: boolean
) => {
   if (response && response <= 200) {
      return true;
   } else if (isLoading) {
      return true;
   } else {
      return false;
   }
};
