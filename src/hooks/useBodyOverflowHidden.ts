
import { useEffect } from "react";

/**
 * 메뉴/모달 등 오버레이가 열릴 때 body 스크롤을 완전히 차단한다.
 * @param active true면 overflow: hidden, false면 복구
 */
export function useBodyOverflowHidden(active: boolean) {
	useEffect(() => {
		if (active) {
			// 기존 스타일 보존
			const prev = document.body.style.overflow;
			document.body.style.overflow = "hidden";
			return () => {
				document.body.style.overflow = prev;
			};
		}
		// 닫힐 때 복구
		document.body.style.overflow = "";
		return undefined;
	}, [active]);
}
