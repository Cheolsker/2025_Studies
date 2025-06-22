/**
 * 숫자를 한국 원화 형식의 문자열로 변환합니다.
 * @param {number} value - 포맷할 숫자
 * @returns {string} 원화 형식의 문자열 (예: ₩1,234.56)
 */
export function formatCurrency(value) {
  // 숫자가 음수인지 확인
  const isNegative = value < 0;

  // 절댓값을 사용하여 포맷팅
  const absoluteValue = Math.abs(value);

  // 숫자를 소수점 2자리까지 표시하고 천 단위 구분자 추가
  const formattedValue = absoluteValue.toLocaleString("ko-KR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // 음수인 경우 마이너스 기호를 앞에 추가
  return isNegative ? `-₩${formattedValue}` : `₩${formattedValue}`;
}
