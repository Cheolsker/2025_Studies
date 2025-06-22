import { formatCurrency } from "../utils/formatCurrency";

describe("formatCurrency", () => {
  it("양수를 통화 형식으로 포맷한다", () => {
    expect(formatCurrency(1234.56)).toBe("₩1,234.56");
    expect(formatCurrency(1000000)).toBe("₩1,000,000.00");
    expect(formatCurrency(999.99)).toBe("₩999.99");
  });

  it("0을 통화 형식으로 포맷한다", () => {
    expect(formatCurrency(0)).toBe("₩0.00");
  });

  it("음수를 통화 형식으로 포맷한다", () => {
    expect(formatCurrency(-1234.56)).toBe("-₩1,234.56");
    expect(formatCurrency(-1000000)).toBe("-₩1,000,000.00");
    expect(formatCurrency(-999.99)).toBe("-₩999.99");
  });

  it("소수점이 없는 정수를 통화 형식으로 포맷한다", () => {
    expect(formatCurrency(1000)).toBe("₩1,000.00");
    expect(formatCurrency(-1000)).toBe("-₩1,000.00");
  });

  it("소수점 이하가 1자리인 경우도 올바르게 포맷한다", () => {
    expect(formatCurrency(1234.5)).toBe("₩1,234.50");
    expect(formatCurrency(-1234.5)).toBe("-₩1,234.50");
  });
});
