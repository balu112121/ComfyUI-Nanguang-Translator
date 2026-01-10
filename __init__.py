"""
ComfyUI-Nanguang-Translator 插件
百度翻译集成工具 - 简化版
版本: 1.0.0
作者: 南光AIGC
邮箱: nankodesign@sina.com
"""

import sys
import os

# 添加当前目录到Python路径
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from .nodes import NODE_CLASS_MAPPINGS, NODE_DISPLAY_NAME_MAPPINGS

__all__ = ['NODE_CLASS_MAPPINGS', 'NODE_DISPLAY_NAME_MAPPINGS']

print("=" * 50)
print("南光AIGC翻译插件 (简化版) 加载成功")
print("版本: 1.0.0")
print("节点数: 2")
print("1. 百度翻译小助手")
print("2. 文本预处理工具")
print("作者: 南光AIGC")
print("邮箱: nankodesign@sina.com")
print("=" * 50)