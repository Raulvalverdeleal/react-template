import fs from 'fs';
import path from 'path';
import clipboard from 'clipboardy';

const config = {
    name: "default",
    iconsPath: 'public/icons.svg',
    typePath: 'src/types/global.d.ts',
};

const args = loadArgs();
insertName(args.name);
insertSymbol(args.iconsPath);

async function insertSymbol(iconsPath) {
    const filePath = path.resolve(iconsPath);
    let content = '';
    if (fs.existsSync(filePath)) {
        content = fs.readFileSync(filePath, 'utf-8');
    }

    const lines = content.split('\n');
    const rawSvg = await clipboard.read();
    const { height, width } = extractHeightWidth(rawSvg);

    const text = `
    <symbol id="${args.name}" viewBox="0 0 ${width} ${height}">
        ${rawSvg}
    </symbol>`
    lines.splice(1, 0, text);

    fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
    console.log(`${args.name} icon have been added: \n ${text}`);
}

function insertName(name) {
    const typeFilePath = path.resolve(config.typePath);

    if (!fs.existsSync(typeFilePath)) {
        console.error(`Error: '${typeFilePath}' not found.`);
        process.exit(1);
    }

    let content = fs.readFileSync(typeFilePath, 'utf-8');
    const regexCheck = new RegExp(`\\|\\s*'${name}'`);
    if (regexCheck.test(content)) {
        console.error(`Icon name '${name}' already exist.`);
        process.exit(1);
    }

    const iconNameRegex = /(export type IconName =)([\s\S]*?);/;
    const match = content.match(iconNameRegex);
    if (!match) {
        console.error(`IconName type was not found in ${config.typePath}`);
        process.exit(1);
    }

    let iconBlock = match[2];
    const lines = iconBlock.split('\n');
    let insertIndex = lines.length;
    for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].trim()) {
            insertIndex = i + 1;
            break;
        }
    }

    lines.splice(insertIndex, 0, `\t| '${name}'`);
    const newIconBlock = lines.join('\n');
    const newContent = content.replace(iconNameRegex, `$1${newIconBlock};`);
    fs.writeFileSync(typeFilePath, newContent, 'utf-8');
}

function parseArgs() {
    const args = process.argv.slice(2);
    const params = {};
    for (let i = 0; i < args.length; i += 2) {
        const key = args[i];
        const value = args[i + 1];
        params[key] = value;
    }
    return params;
}

function loadArgs() {
    const args = parseArgs();
    const computedArgs = {
        iconsPath: args['-i'] || args['--icons-path'] || config.iconsPath,
        typePath: args['-t'] || args['--type-path'] || config.typePath,
        name: args['-n'] || args['--name'] || config.name,
    };
    for (const [name, value] of Object.entries(computedArgs)) {
        if (value) continue;
        console.error(`${name} is not defined.`);
        process.exit(1);
    }
    return computedArgs;
}

function extractHeightWidth(svg) {
    const heightMatch = svg.match(/height="(\d+)/);
    const widthMatch = svg.match(/width="(\d+)/);
    const height = heightMatch ? parseInt(heightMatch[1], 10) : 24;
    const width = widthMatch ? parseInt(widthMatch[1], 10) : 24;
    return { height, width };
}
