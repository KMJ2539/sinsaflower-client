/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/shared/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#7FC83A",
          hover: "#76914F",
          focus: "#FACC15",
        },
        secondary: "#FDE68A", // 보조 색상
        default: "#999999",
        accent: "#226032", // 강조 색상
        light: "#F4ECF7", // 밝은 배경색
        dark: "#311432", // 어두운 배경색
        danger: "#E74C3C", // 경고/에러 색상
        success: "#22c55e", //성공 색상
        input: "#C9C9C9",
      },
      zIndex: {
        modal: 1000,
        preview: 1100,
        toast: 9999,
      },
    },
  },
  plugins: [],
};
