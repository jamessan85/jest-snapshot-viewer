import * as fs from 'node:fs';
import {spawn} from "node:child_process";
import * as path from "node:path";
import { generateHTMLTemplate } from './htmlTemplates';

const tempPath = path.join(__dirname, "..", "/temp/");

export function previewSnapshot(fileName: string, tag = "div", viewMode: 'browser' | 'vscode' = "browser" ) {
    createTempIfNotFound();
    clearTempFiles();

    const endFileName = fileName.split('/').at(-1);
    const strippedHeading: string[] = [];

    let file = fs.readFileSync(fileName, { encoding: 'utf-8' });
    // file = file.replace(/\/\/ {0,1}.+/g, "");
    const splittedSnapsShots = file.split('`;');
    

    const snapShots = splittedSnapsShots.map((item: string) => {
        item = item.replace(/(exports\[`)([\S\s]+)(`\] = `)/, (match: string, p1: string, p2: string, p3: string) => {
            strippedHeading.push(p2);
            return match.replace(p1, `<h1 class="test-name" id="${p2.replaceAll(" ", "_")}">`).replace(p3, `</h1>\n<${tag} class="snapshot-output">`);
        });
        return item + `</${tag}>`;
    });

    let htmlContent = generateHTMLTemplate(snapShots, strippedHeading);
    if (viewMode === "browser") {
        const tempLocation = tempPath + endFileName + '.html';
        // write to temp folder
        fs.writeFileSync(tempLocation, htmlContent);
        // open default browser
        spawn('open', [tempLocation]);
    }

    return htmlContent;
}

function clearTempFiles() {
    const files = fs.readdirSync(tempPath);
    if (files.length <= 0) {
        return;
    }

    files.forEach((file: string) => {
        fs.rmSync(tempPath + file);
    });
}

function checkIfTempExists() {
    return fs.existsSync(tempPath);
}

export function createTempIfNotFound() {
    if (!checkIfTempExists()) {
        fs.mkdirSync(tempPath);
    }
}

