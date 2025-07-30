"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex text-sm font-medium text-gray-800 hover:underline"
      >
        화환앤플라워 님
        <Image
          src="/icons/dropdown-black.svg"
          alt="dropdown"
          width={20}
          height={20}
        />
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-md border text-sm z-50">
          <li>
            <Link
              href="/edit-profile"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              회원 정보 수정
            </Link>
          </li>
          <li>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                // TODO: 로그아웃 처리 함수 호출
                console.log("로그아웃");
              }}
            >
              로그아웃
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
