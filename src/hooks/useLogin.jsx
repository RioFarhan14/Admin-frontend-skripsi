import { useEffect } from "react";
import { validateToken } from "../service/auth";

export const useLogin = () => {
   useEffect(() => {
      const token = localStorage.getItem("token")
      if (token) {
        validateToken(token)
          .then((res) => {
            if (res.success){
                return;
            }else{
                window.location.href = '/'
                localStorage.removeItem("token")
            }
          })
      }else {
        window.location.href = '/'
        localStorage.removeItem("token")
      }
   }, [])
}