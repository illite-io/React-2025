# Design Document

## Overview

썸네일 생성 프로그램은 Python 기반의 GUI 애플리케이션으로, Tkinter를 사용한 사용자 인터페이스와 Pillow(PIL) 라이브러리를 활용한 이미지 처리 기능을 제공합니다. 사용자가 이미지를 선택하고 제목을 입력하면, 실시간 미리보기를 통해 결과를 확인하고 최종 썸네일을 저장할 수 있습니다.

## Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GUI Layer     │    │  Business Logic │    │  File System    │
│   (Tkinter)     │◄──►│     Layer       │◄──►│    Layer        │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Event Handlers  │    │ Image Processor │    │ File Operations │
│ User Interactions│    │ Text Overlay    │    │ Load/Save       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Component Interaction Flow

1. **User Input** → GUI Layer captures events
2. **Event Processing** → Business Logic processes user actions
3. **Image Processing** → Pillow library handles image manipulation
4. **Preview Update** → Real-time preview updates in GUI
5. **File Operations** → Save/Load operations through File System Layer

## Components and Interfaces

### 1. Main Application Class (`ThumbnailGenerator`)

**Responsibilities:**
- Initialize and manage the main application window
- Coordinate between different components
- Handle application lifecycle

**Key Methods:**
```python
class ThumbnailGenerator:
    def __init__(self)
    def setup_ui(self)
    def run(self)
```

### 2. UI Manager (`UIManager`)

**Responsibilities:**
- Create and manage GUI components
- Handle layout and styling
- Manage user interactions

**Key Methods:**
```python
class UIManager:
    def create_file_selection_frame(self)
    def create_text_input_frame(self)
    def create_style_controls_frame(self)
    def create_preview_frame(self)
    def create_action_buttons_frame(self)
```

### 3. Image Processor (`ImageProcessor`)

**Responsibilities:**
- Load and validate image files
- Apply text overlay to images
- Handle image format conversions
- Generate preview images

**Key Methods:**
```python
class ImageProcessor:
    def load_image(self, file_path: str) -> PIL.Image
    def validate_image_format(self, file_path: str) -> bool
    def add_text_overlay(self, image: PIL.Image, text: str, **style_options) -> PIL.Image
    def generate_preview(self, image: PIL.Image, max_size: tuple) -> PIL.Image
    def save_image(self, image: PIL.Image, output_path: str, format: str)
```

### 4. Text Style Manager (`TextStyleManager`)

**Responsibilities:**
- Manage text styling options
- Calculate optimal font sizes
- Handle text positioning and alignment

**Key Methods:**
```python
class TextStyleManager:
    def calculate_font_size(self, text: str, image_size: tuple, max_width_ratio: float)
    def get_text_position(self, text_size: tuple, image_size: tuple, position: str)
    def create_text_background(self, text_size: tuple, background_color: tuple)
```

### 5. File Manager (`FileManager`)

**Responsibilities:**
- Handle file dialog operations
- Validate file paths and permissions
- Manage supported file formats

**Key Methods:**
```python
class FileManager:
    def open_file_dialog(self, file_types: list) -> str
    def save_file_dialog(self, default_name: str, file_types: list) -> str
    def validate_file_path(self, file_path: str) -> bool
```

## Data Models

### 1. Image Data Model

```python
@dataclass
class ImageData:
    original_image: PIL.Image
    file_path: str
    format: str
    size: tuple
    modified_time: datetime
```

### 2. Text Style Model

```python
@dataclass
class TextStyle:
    text: str
    font_size: int
    font_color: tuple  # RGB
    position: str  # 'top', 'center', 'bottom'
    background_enabled: bool
    background_color: tuple  # RGBA
    background_opacity: float
```

### 3. Application State Model

```python
@dataclass
class AppState:
    current_image: Optional[ImageData]
    text_style: TextStyle
    preview_image: Optional[PIL.Image]
    is_ready_to_save: bool
```

## Error Handling

### Error Categories

1. **File Operation Errors**
   - Invalid file format
   - File not found
   - Permission denied
   - Corrupted image files

2. **Image Processing Errors**
   - Memory limitations for large images
   - Unsupported image modes
   - Text rendering failures

3. **UI Errors**
   - Invalid user input
   - GUI component failures

### Error Handling Strategy

```python
class ErrorHandler:
    def handle_file_error(self, error: Exception, context: str)
    def handle_image_error(self, error: Exception, context: str)
    def handle_ui_error(self, error: Exception, context: str)
    def show_error_dialog(self, title: str, message: str)
    def log_error(self, error: Exception, context: str)
```

### User Feedback Mechanism

- **Error Messages**: Clear, actionable error messages in Korean
- **Progress Indicators**: Loading indicators for time-consuming operations
- **Success Notifications**: Confirmation messages for successful operations
- **Input Validation**: Real-time validation with immediate feedback

## Testing Strategy

### 1. Unit Testing

**Image Processing Tests:**
```python
def test_load_valid_image()
def test_load_invalid_image()
def test_add_text_overlay()
def test_text_positioning()
def test_font_size_calculation()
```

**File Management Tests:**
```python
def test_file_validation()
def test_save_operations()
def test_file_dialog_operations()
```

### 2. Integration Testing

**UI Integration Tests:**
```python
def test_file_selection_workflow()
def test_text_input_workflow()
def test_style_adjustment_workflow()
def test_save_workflow()
```

### 3. User Acceptance Testing

**Test Scenarios:**
1. Complete thumbnail creation workflow
2. Error handling scenarios
3. Edge cases (very long text, large images)
4. Performance testing with various image sizes

### 4. Test Data

**Sample Images:**
- Various formats (JPG, PNG, JPEG)
- Different sizes (small, medium, large)
- Different aspect ratios
- Edge cases (very wide, very tall)

**Sample Text:**
- Short titles
- Long titles requiring wrapping
- Special characters and Korean text
- Empty strings

## Implementation Considerations

### Performance Optimization

1. **Image Caching**: Cache processed images to avoid reprocessing
2. **Lazy Loading**: Load images only when needed
3. **Memory Management**: Proper disposal of large image objects
4. **Preview Optimization**: Use smaller preview images for real-time updates

### User Experience

1. **Responsive UI**: Non-blocking operations with progress indicators
2. **Keyboard Shortcuts**: Common operations accessible via keyboard
3. **Drag & Drop**: Support for dragging images into the application
4. **Recent Files**: Quick access to recently used images

### Extensibility

1. **Plugin Architecture**: Support for additional text effects
2. **Template System**: Pre-defined text styles and layouts
3. **Batch Processing**: Process multiple images at once
4. **Export Options**: Multiple output formats and quality settings

### Dependencies

**Core Dependencies:**
- `tkinter`: GUI framework (built-in with Python)
- `Pillow (PIL)`: Image processing library
- `pathlib`: File path operations (built-in)

**Optional Dependencies:**
- `tkinter.ttk`: Enhanced UI components
- `configparser`: Configuration management
- `logging`: Error logging and debugging