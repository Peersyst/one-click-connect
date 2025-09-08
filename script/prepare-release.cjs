#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get the version from command line arguments
const version = process.argv[2];

if (!version) {
    console.error('Please provide a version number');
    console.error('Usage: node update-versions.js <version>');
    process.exit(1);
}

// Validate version format (basic semver check)
if (!/^\d+\.\d+\.\d+(-\w+(\.\d+)?)?$/.test(version)) {
    console.error('Invalid version format. Please use semver format (e.g., 1.2.3 or 1.2.3-beta.1)');
    process.exit(1);
}

// Packages to ignore (relative to packages directory)
const ignoredPackages = [
    'shared/eslint',
    'shared/test',
    'shared/tsconfig',
    'shared/tsup'
];

// Get the root directory of the project
const rootDir = path.resolve(__dirname, '..');
const packagesDir = path.join(rootDir, 'packages');

// Check if a path should be ignored
function shouldIgnore(filePath) {
    // Ignore node_modules directories
    if (filePath.includes('node_modules')) {
        return true;
    }

    // Check if the path contains any of the ignored packages
    const relativePath = path.relative(packagesDir, filePath);
    return ignoredPackages.some(ignoredPath => relativePath.startsWith(ignoredPath));
}

// Find all package.json files in the packages directory recursively
function findPackageJsonFiles(dir) {
    const results = [];

    if (shouldIgnore(dir)) {
        return results;
    }

    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            results.push(...findPackageJsonFiles(filePath));
        } else if (file === 'package.json') {
            results.push(filePath);
        }
    }

    return results;
}

// Update a package.json file
function updatePackageJson(packageJsonPath) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const originalVersion = packageJson.version;

    // Update the version
    packageJson.version = version;

    // Update workspace dependencies
    const dependencyTypes = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];

    for (const depType of dependencyTypes) {
        if (packageJson[depType]) {
            for (const [name, depVersion] of Object.entries(packageJson[depType])) {
                if (depVersion === 'workspace:*' || depVersion.startsWith('workspace:')) {
                    packageJson[depType][name] = version;
                }
            }
        }
    }

    // Save the updated package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4) + '\n');

    // Get relative path for cleaner output
    const relativePath = path.relative(rootDir, packageJsonPath);

    console.log(`Updated ${relativePath}:`);
    console.log(`  - Version: ${originalVersion} → ${version}`);
    console.log(`  - Replaced workspace:* dependencies with version ${version}`);
}

// Main execution
try {
    console.log(`Updating packages to version ${version}...`);
    console.log('Ignoring packages:', ignoredPackages);

    const packageJsonFiles = findPackageJsonFiles(packagesDir);

    if (packageJsonFiles.length === 0) {
        console.log('No package.json files found in the packages directory (after applying ignore filters)');
        process.exit(0);
    }

    console.log(`Found ${packageJsonFiles.length} package.json files to update`);

    for (const packageJsonPath of packageJsonFiles) {
        updatePackageJson(packageJsonPath);
    }

    console.log('All packages updated successfully!');
} catch (error) {
    console.error('Error updating packages:', error);
    process.exit(1);
}