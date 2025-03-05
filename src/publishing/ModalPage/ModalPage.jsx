import React, { useState,useEffect } from "react";
import useHeaderStore from '../../store/useHeaderStore';
import InputText from "../../components/InputText/InputText";
import Button from "../../components/Button/Button";
import Select from "../../components/Select/Select";
import Modal from "../../components/Modal/Modal";

const ModalPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const { setHeaderShow } = useHeaderStore();

    const [selectedOption, setSelectedOption] = useState("");

    const handleSelctChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleClick = () => {
        setIsModalOpen(true)
    }

    const handleClick2 = () => {
        setIsModalOpen2(true)
    }

    const handleClick3 = () => {
        setIsModalOpen3(true)
    }

    const handleAdd = () => {
        alert("Add 버튼이 클릭되었습니다!");
        setIsModalOpen(false); // 모달 닫기
    };

    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    useEffect(() => {
        setHeaderShow(false);
    }, [setHeaderShow]);


  return (
    <div className="sample">
      <Button children="confirm" onClick={handleClick} variant="blue" size="medium" />
      <Button children="alert" onClick={handleClick2} variant="blue" size="medium" />
      <Button children="info" onClick={handleClick3} variant="blue" size="medium" />


      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleAdd} title="confirm" type="confirm" size={"800px"}>
        <table class="vertical-table">
            <colgroup>
                <col style={{width: "160px"}}></col>
            </colgroup>
            <tbody>
                <tr>
                    <th>IMO Number</th>
                    <td><InputText placeholder="검색어를 입력하세요." size="150px"/></td>
                </tr>
                <tr>
                    <th>Ship Name</th>
                    <td><InputText placeholder="검색어를 입력하세요." size="150px"/></td>
                </tr>
                <tr>
                    <th>Ship Type</th>
                    <td>
                        <Select options={options} value={selectedOption} onChange={handleSelctChange} placeholder="Choose an option" size="200px"/>
                    </td>
                </tr>
            </tbody>
        </table>
      </Modal>

    
      <Modal isOpen={isModalOpen2} onClose={() => setIsModalOpen2(false)} onConfirm={handleAdd} title="alert" type="alert" size={"600px"}>
      <table class="vertical-table">
            <colgroup>
                <col style={{width: "160px"}}></col>
            </colgroup>
            <tbody>
                <tr>
                    <th>IMO Number</th>
                    <td><InputText placeholder="검색어를 입력하세요." size="150px"/></td>
                </tr>
                <tr>
                    <th>Ship Name</th>
                    <td><InputText placeholder="검색어를 입력하세요." size="150px"/></td>
                </tr>
                <tr>
                    <th>Ship Type</th>
                    <td>
                        <Select options={options} value={selectedOption} onChange={handleSelctChange} placeholder="Choose an option" size="200px"/>
                    </td>
                </tr>
            </tbody>
        </table>
      </Modal>


      <Modal isOpen={isModalOpen3} onClose={() => setIsModalOpen3(false)} onConfirm={handleAdd} title="info" type="info" size={"700px"}>
        <table class="vertical-table">
            <colgroup>
                <col style={{width: "160px"}}></col>
            </colgroup>
            <tbody>
                <tr>
                    <th>IMO Number</th>
                    <td><InputText placeholder="검색어를 입력하세요." size="150px"/></td>
                </tr>
                <tr>
                    <th>Ship Name</th>
                    <td><InputText placeholder="검색어를 입력하세요." size="150px"/></td>
                </tr>
                <tr>
                    <th>Ship Type</th>
                    <td>
                        <Select options={options} value={selectedOption} onChange={handleSelctChange} placeholder="Choose an option" size="200px"/>
                    </td>
                </tr>
            </tbody>
        </table>
      </Modal>
    </div>
  );
};

export default ModalPage;
