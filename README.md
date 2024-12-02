# MealChronicle

MealChronicle is an AI-powered WebApp designed to generate personalized recipes based on user inputs.
Welcome to MealChronicle!

This document outlines our development workflow and branching strategy to ensure a smooth collaboration.

# Branching Strategy
## Main Branches:

    main: Production-ready, stable code.
    Development: Staging branch for integrating features before they are merged into main.

## CoreFeature Branches:

    CoreFeature/<Feature-Group>: Represents high-level features (e.g., AI integration, UI improvements).
    Only feature branches that are part of the specific CoreFeature are merged here.

## Feature Branches:

    Format: Feature/<Issue-ID>-<Short-Description> (e.g., Feature/101-Optimize-AI-Prompt).
    Represents individual tasks or issues.

## Workflow
Starting Work => Create a new feature branch:    

    git checkout -b Feature/<Issue-ID>-<Short-Description> CoreFeature/<Feature-Group>

Example:

    git checkout -b Feature/101-Optimize-AI-Prompt CoreFeature/AI-Integration

## Committing Changes:
Follow the commit message format:
    
    git commit -m "[Feature #<Issue-ID>] <Short Description>"

Example:

    git commit -m "[Feature #101] Add AI prompt optimization for LLM"

## Testing and Pushing:

    Test your changes locally.
    Push to the remote repository:

        git push origin Feature/<Issue-ID>-<Short-Description>

    Creating a Pull Request:
        Submit a pull request (PR) to the appropriate CoreFeature branch.
        Link the PR to the GitHub issue (use Fixes #<Issue-ID> in the PR description).

    Review and Merge:
        Once approved, the PR is merged into the CoreFeature branch.
        After all features in a CoreFeature are complete, the CoreFeature branch is merged into Development.

# Naming Conventions
## Branch Naming:

    CoreFeature/<Feature-Group> (e.g., CoreFeature/AI-Integration).
    Feature/<Issue-ID>-<Short-Description> (e.g., Feature/101-Optimize-AI-Prompt).

## Commit Messages:

    Format: [Feature #<Issue-ID>] <Short Description>.

## Additional Notes

    Issue Tracking:
        Use GitHub Issues to track tasks, bugs, and features.
    Documentation:
        Refer to the Wiki for detailed feature guides.

## Action Steps for Step 2

    Create the CONTRIBUTING.md File:
        Add the above content to a new CONTRIBUTING.md file in the root of your repository.
        Commit and push the file to the Development branch:

    git checkout Development
    git add CONTRIBUTING.md
    git commit -m "[Docs] Add CONTRIBUTING.md with branching strategy"
    git push origin Development

## Link to the Wiki:

    If needed, add a note in the README.md pointing contributors to the CONTRIBUTING.md file for workflow guidance.

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   ng serve
   ```
4. Open your browser and navigate to `http://localhost:4200`

## Features

- Recipe generation based on available ingredients
- Modern, responsive UI
- Modular architecture for scalability

## Development

This project was generated with Angular CLI version 18.1.0.

### Project Structure

- `src/app/features/recipe` - Recipe module and components
- `src/app/shared` - Shared components and utilities
- `src/app/core` - Core services and guards

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
