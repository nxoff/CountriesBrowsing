import { loadMainContent } from "./loadMainPage.js";
import { loadDetailContent } from "./loadDetailPage.js";

if (window.location.search.includes("?name=")) {
	loadDetailContent();
} else {
	loadMainContent();
}
