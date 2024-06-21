import { useEffect } from "react"

export function useKey(keyCode, callback) {
  useEffect(() => {
    function callBack(e) {
      if (e.code.toLowerCase() === keyCode.toLowerCase()) {
        callback()
      }
    }

    document.addEventListener("keydown", callBack)

    return function () {
      document.removeEventListener("keydown", callBack)
    }
  }, [callback, keyCode]) 
}