#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
썸네일 생성 프로그램
사진에 제목을 추가하여 썸네일을 생성합니다.
"""

import os
import sys
from PIL import Image, ImageDraw, ImageFont
import tkinter as tk
from tkinter import filedialog, messagebox, ttk
from tkinter import font as tkFont

class ThumbnailGenerator:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("썸네일 생성기")
        self.root.geometry("600x500")
        self.root.resizable(True, True)
        
        self.image_path = None
        self.setup_ui()
    
    def setup_ui(self):
        # 메인 프레임
        main_frame = ttk.Frame(self.root, padding="20")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # 이미지 선택 섹션
        ttk.Label(main_frame, text="1. 이미지 선택", font=('Arial', 12, 'bold')).grid(row=0, column=0, sticky=tk.W, pady=(0, 10))
        
        image_frame = ttk.Frame(main_frame)
        image_frame.grid(row=1, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=(0, 20))
        
        self.image_label = ttk.Label(image_frame, text="선택된 이미지가 없습니다")
        self.image_label.grid(row=0, column=0, sticky=tk.W, padx=(0, 10))
        
        ttk.Button(image_frame, text="이미지 선택", command=self.select_image).grid(row=0, column=1)
        
        # 제목 입력 섹션
        ttk.Label(main_frame, text="2. 제목 입력", font=('Arial', 12, 'bold')).grid(row=2, column=0, sticky=tk.W, pady=(0, 10))
        
        self.title_var = tk.StringVar()
        title_entry = ttk.Entry(main_frame, textvariable=self.title_var, font=('Arial', 14), width=40)
        title_entry.grid(row=3, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=(0, 20))
        
        # 설정 섹션
        ttk.Label(main_frame, text="3. 설정", font=('Arial', 12, 'bold')).grid(row=4, column=0, sticky=tk.W, pady=(0, 10))
        
        settings_frame = ttk.Frame(main_frame)
        settings_frame.grid(row=5, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=(0, 20))
        
        # 폰트 크기
        ttk.Label(settings_frame, text="폰트 크기:").grid(row=0, column=0, sticky=tk.W, padx=(0, 10))
        self.font_size_var = tk.IntVar(value=48)
        font_size_spin = ttk.Spinbox(settings_frame, from_=20, to=100, textvariable=self.font_size_var, width=10)
        font_size_spin.grid(row=0, column=1, sticky=tk.W, padx=(0, 20))
        
        # 텍스트 위치
        ttk.Label(settings_frame, text="텍스트 위치:").grid(row=0, column=2, sticky=tk.W, padx=(0, 10))
        self.position_var = tk.StringVar(value="bottom")
        position_combo = ttk.Combobox(settings_frame, textvariable=self.position_var, 
                                    values=["top", "center", "bottom"], state="readonly", width=10)
        position_combo.grid(row=0, column=3, sticky=tk.W)
        
        # 생성 버튼
        generate_btn = ttk.Button(main_frame, text="썸네일 생성", command=self.generate_thumbnail, 
                                style="Accent.TButton")
        generate_btn.grid(row=6, column=0, columnspan=2, pady=20)
        
        # 그리드 설정
        main_frame.columnconfigure(0, weight=1)
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)
    
    def select_image(self):
        file_types = [
            ("이미지 파일", "*.jpg *.jpeg *.png *.bmp *.gif *.tiff"),
            ("JPEG 파일", "*.jpg *.jpeg"),
            ("PNG 파일", "*.png"),
            ("모든 파일", "*.*")
        ]
        
        self.image_path = filedialog.askopenfilename(
            title="이미지 선택",
            filetypes=file_types
        )
        
        if self.image_path:
            filename = os.path.basename(self.image_path)
            self.image_label.config(text=f"선택됨: {filename}")
    
    def generate_thumbnail(self):
        if not self.image_path:
            messagebox.showerror("오류", "이미지를 선택해주세요.")
            return
        
        title = self.title_var.get().strip()
        if not title:
            messagebox.showerror("오류", "제목을 입력해주세요.")
            return
        
        try:
            # 이미지 열기
            image = Image.open(self.image_path)
            
            # RGBA 모드로 변환 (투명도 지원)
            if image.mode != 'RGBA':
                image = image.convert('RGBA')
            
            # 텍스트 오버레이를 위한 새 이미지 생성
            overlay = Image.new('RGBA', image.size, (255, 255, 255, 0))
            draw = ImageDraw.Draw(overlay)
            
            # 폰트 설정
            font_size = self.font_size_var.get()
            try:
                # Windows 기본 폰트 사용
                font = ImageFont.truetype("malgun.ttf", font_size)  # 맑은 고딕
            except:
                try:
                    font = ImageFont.truetype("arial.ttf", font_size)
                except:
                    font = ImageFont.load_default()
            
            # 텍스트 크기 계산
            bbox = draw.textbbox((0, 0), title, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            
            # 텍스트 위치 계산
            img_width, img_height = image.size
            x = (img_width - text_width) // 2
            
            position = self.position_var.get()
            if position == "top":
                y = 50
            elif position == "center":
                y = (img_height - text_height) // 2
            else:  # bottom
                y = img_height - text_height - 50
            
            # 텍스트 배경 (반투명 검은색)
            padding = 20
            bg_x1 = x - padding
            bg_y1 = y - padding
            bg_x2 = x + text_width + padding
            bg_y2 = y + text_height + padding
            
            draw.rectangle([bg_x1, bg_y1, bg_x2, bg_y2], fill=(0, 0, 0, 128))
            
            # 텍스트 그리기 (흰색)
            draw.text((x, y), title, font=font, fill=(255, 255, 255, 255))
            
            # 이미지 합성
            result = Image.alpha_composite(image, overlay)
            result = result.convert('RGB')
            
            # 저장 경로 설정
            base_name = os.path.splitext(os.path.basename(self.image_path))[0]
            save_path = filedialog.asksaveasfilename(
                title="썸네일 저장",
                defaultextension=".jpg",
                initialfile=f"{base_name}_thumbnail.jpg",
                filetypes=[
                    ("JPEG 파일", "*.jpg"),
                    ("PNG 파일", "*.png"),
                    ("모든 파일", "*.*")
                ]
            )
            
            if save_path:
                result.save(save_path, quality=95)
                messagebox.showinfo("완료", f"썸네일이 저장되었습니다:\n{save_path}")
        
        except Exception as e:
            messagebox.showerror("오류", f"썸네일 생성 중 오류가 발생했습니다:\n{str(e)}")
    
    def run(self):
        self.root.mainloop()

if __name__ == "__main__":
    app = ThumbnailGenerator()
    app.run()