# Notion Clone

## Description

This is a simple Notion clone application built with React and TypeScript. The application allows users to create and edit text and image blocks, as well as markdown blocks. It supports adding new blocks, editing existing blocks, and deleting blocks. Additionally, the application features a summarization tool that uses OpenAI's API to summarize the content of the blocks.

## Features

- **Text Blocks**: Add and customize text blocks with different tags (H1, H2, H3, Paragraph).
- **Image Blocks**: Add image blocks by uploading from local storage or pasting an image URL. Customize the height and width of the images.
- **Markdown Blocks**: Add and edit markdown blocks with live preview.
- **Edit and Delete**: Edit and delete existing blocks.
- **Summarization Tool**: Summarize the content of the blocks using OpenAI's API.
- **Dark Theme**: The application features a dark theme with styled components.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/AdhamKhalifa/NotionClone
    ```

2. Navigate to the project directory:

    ```bash
    cd notion-clone
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

4. Start the development server:

    ```bash
    npm start
    ```

    or

    ```bash
    yarn start
    ```

5. Start the backend server:

    ```bash
    node server.js
    ```

### Usage

1. **Adding a Block**:
   - Use the dropdown to select the type of block you want to add (Text, Image, Markdown).
   - Fill in the required fields. For text blocks, select the tag and enter the content. For image blocks, choose to upload from local or enter an image URL, and customize the width and height. For markdown blocks, enter the markdown content.
   - Click the "Save" button to add the block.

2. **Editing a Block**:
   - Hover over the block you want to edit. Click the "Edit" button that appears.
   - Update the fields as needed and click "Save" to apply the changes.

3. **Deleting a Block**:
   - Hover over the block you want to delete. Click the "Delete" button that appears.

4. **Summarizing Content**:
   - Click the star button located at the bottom right corner of the screen.
   - A popup will appear displaying the summary of the content in the blocks.

### File Structure

- `src/`
  - `App.tsx`: The main application component.
  - `Block.tsx`: Component for rendering individual blocks.
  - `BlockEditor.tsx`: Component for adding and editing blocks.
  - `MarkdownBlock.tsx`: Component for rendering markdown blocks.
  - `Modal.tsx`: Component for displaying the summary modal.
  - `SummarizeButton.tsx`: Component for the summarize button.
  - `Tooltip.tsx`: Component for custom tooltips.
  - `styles.css`: Stylesheet for the application.
- `server.js`: The backend server for handling API requests.
- `data.json`: The data file for storing block content.

### Dependencies

- React
- TypeScript
- Axios
- React Icons
- React Markdown
- Express
- Multer
- OpenAI

### API Endpoints

- **GET /blocks**: Fetch all blocks.
- **POST /blocks**: Add a new block.
- **PUT /blocks/:id**: Update an existing block.
- **DELETE /blocks/:id**: Delete a block.
- **POST /upload**: Upload an image.
- **POST /summarize**: Summarize the content using OpenAI's API.

### Configuration

- **OpenAI API Key**: Set the OpenAI API key in the `.env` file:

    ```
    OPENAI_API_KEY=your-api-key-here
    ```

### Contributing

Feel free to fork the repository and submit pull requests.

### License

This project is licensed under the MIT License.