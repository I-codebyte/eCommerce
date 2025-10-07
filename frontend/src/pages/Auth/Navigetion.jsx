import { useState } from "react";
import {
	AiOutlineHome,
	AiOutlineShopping,
	AiOutlineLogin,
	AiOutlineUserAdd,
	AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
	const [dropDownOpen, setDropDownOpen] = useState(false);
	const [showSideBar, setShowSideBar] = useState(false);

	const toggleDropDown = () => {
		setDropDownOpen(!dropDownOpen);
	};

	const toggleSideBar = () => {
		setShowSideBar(!showSideBar);
	};

	const closeSideBar = () => {
		setShowSideBar(false);
	};

	return <div>

    </div>;
}
