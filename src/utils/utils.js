export const utils = {
  convertBase64(file) {
    return new Promise((resolve, reject) => {
      const fileRider = new FileReader();
      fileRider.readAsDataURL(file);
      fileRider.onload = () => {
        resolve(fileRider.result);
      };
      fileRider.onerror = (error) => {
        reject(error);
      };
    });
  },
  generateID() {
    const token = Math.random().toString(16).slice(2);
    localStorage.setItem("X-APP-ID", JSON.stringify(token));
    return token;
  },
};
