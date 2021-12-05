import {User} from "../components/Main";

export const CompareObjects = (object1: User, object2: User, key: string) => {
    if (key !== 'name' && key !== 'office') return 0;
    const obj1 = object1[key].toUpperCase()
    const obj2 = object2[key].toUpperCase()

    if (obj1 < obj2) {
        return -1
    }
    if (obj1 > obj2) {
        return 1
    }
    return 0
}

export const HtmlToText = (html?: string) => {
    if (!html) return ['No information'];
    // remove code brakes and tabs
    html = html.replace(/\n/g, "");
    html = html.replace(/\t/g, "");
    html = html.replace(/<p>/g, "");

    //keep html brakes and tabs
    html = html.replace(/<\/p>/g, "\n");
    html = html.replace(/<br>/g, "\n");
    html = html.replace(/<br( )*\/>/g, "\n");

    return html.split("\n").filter(Boolean);
}