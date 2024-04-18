import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useAuthContext();
  console.log(user);

  if (!user) {
    // alert('먼저 로그인을 해 주세요.');
    return (
        <Navigate to='/' replace={true} />
    );
  }

  if (requireAdmin && !user.isAdmin) {
    // alert('관리자만 사용 가능한 메뉴입니다.');
    return (
        <Navigate to='/' replace={true} />
    );
  }

  return children;
}