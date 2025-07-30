import React, { useState } from "react";
import styles from "./ProductPriceTable.module.css";
import Modal from "@/shared/components/ui/Modal";
import RegionSelector from "@/features/region/components/RegionSelector";

interface PriceData {
  sido: string;
  sigungu: string;
  prices: {
    [key: string]: number;
  };
}

const ProductPriceTable = () => {
  const [priceData, setPriceData] = useState<{ [key: string]: PriceData }>({});

  const [isOpenRegionModal, setIsOpenRegionModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const categories = [
    "축하",
    "근조",
    "오브제",
    "동양",
    "서양",
    "꽃",
    "관엽",
    "쌀",
    "과일",
    "기타",
  ];

  const handleAddRegion = (sido: string, sigungu: string) => {
    const regionKey = `${sido} ${sigungu}`;
    if (!priceData[regionKey]) {
      setPriceData((prev) => ({
        ...prev,
        [regionKey]: {
          sido,
          sigungu,
          prices: {},
        },
      }));
    }
    setIsOpenRegionModal(false);
  };

  const handlePriceChange = (
    regionKey: string,
    category: string,
    value: string
  ) => {
    const numValue = value === "" ? 0 : parseInt(value);
    setPriceData((prev) => ({
      ...prev,
      [regionKey]: {
        ...prev[regionKey],
        prices: {
          ...prev[regionKey].prices,
          [category]: numValue,
        },
      },
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(Object.keys(priceData));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (regionKey: string, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, regionKey]);
    } else {
      setSelectedRows((prev) => prev.filter((key) => key !== regionKey));
    }
  };

  const handleDeleteSelected = () => {
    setPriceData((prev) => {
      const newData = { ...prev };
      selectedRows.forEach((key) => delete newData[key]);
      return newData;
    });
    setSelectedRows([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <button
          className={styles.actionBtn}
          onClick={() => setIsOpenRegionModal(true)}
        >
          지역 추가
        </button>
        <button
          className={`${styles.actionBtn} ${styles.actionBtn.delete}`}
          onClick={handleDeleteSelected}
          disabled={selectedRows.length === 0}
        >
          선택 삭제
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={selectedRows.length === Object.keys(priceData).length}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </th>
            <th>지역</th>
            {categories.map((category) => (
              <th key={category}>{category}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Object.keys(priceData).length === 0 ? (
            <tr>
              <td
                colSpan={categories.length + 3}
                style={{ textAlign: "center", padding: "2rem" }}
              >
                지역을 추가해주세요
              </td>
            </tr>
          ) : (
            Object.entries(priceData).map(([regionKey, data]) => (
              <tr key={regionKey}>
                <td>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={selectedRows.includes(regionKey)}
                    onChange={(e) =>
                      handleSelectRow(regionKey, e.target.checked)
                    }
                  />
                </td>
                <td className={styles.regionCell}>{regionKey}</td>
                {categories.map((category) => (
                  <td key={category}>
                    <input
                      type="number"
                      className={styles.priceInput}
                      value={data.prices[category] || ""}
                      onChange={(e) =>
                        handlePriceChange(regionKey, category, e.target.value)
                      }
                      placeholder="0"
                    />
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 지역 추가 모달 */}
      <Modal
        isOpen={isOpenRegionModal}
        title="지역 추가"
        hasFooter={false}
        onCancel={() => setIsOpenRegionModal(false)}
        size="lg"
      >
        <RegionSelector onRegionSelect={handleAddRegion} />
      </Modal>
    </div>
  );
};

export default ProductPriceTable;
