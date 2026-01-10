// 南光AIGC翻译插件 - Web界面增强
import { app } from "../../../scripts/app.js";

// 扩展节点显示
app.registerExtension({
    name: "NanguangTranslator.UI",
    
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        // 为翻译节点添加样式
        if (nodeData.name === "BaiduTranslatorNode") {
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function() {
                const r = onNodeCreated?.apply(this, arguments);
                
                // 添加自定义样式
                this.color = "#4A90E2";  // 蓝色主题
                
                return r;
            };
        }
        
        // 为预处理节点添加样式
        if (nodeData.name === "TextPreprocessorNode") {
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function() {
                const r = onNodeCreated?.apply(this, arguments);
                
                // 添加自定义样式
                this.color = "#50C878";  // 绿色主题
                
                return r;
            };
        }
    },
    
    async setup() {
        // 添加自定义菜单按钮
        const menu = document.querySelector(".comfy-menu");
        if (menu) {
            const button = document.createElement("button");
            button.textContent = "🌐 翻译助手";
            button.style.marginLeft = "10px";
            button.style.background = "linear-gradient(135deg, #4A90E2, #50C878)";
            button.style.color = "white";
            button.style.border = "none";
            button.style.padding = "5px 10px";
            button.style.borderRadius = "4px";
            button.style.cursor = "pointer";
            
            button.onclick = () => {
                alert("南光AIGC翻译插件 v1.0.0 (简化版)\n\n包含节点:\n1. 百度翻译小助手\n2. 文本预处理工具\n\n邮箱: nankodesign@sina.com");
            };
            
            menu.appendChild(button);
        }
        
        // 添加节点搜索关键词
        const searchBox = document.querySelector(".comfy-search input");
        if (searchBox) {
            searchBox.placeholder = "搜索节点 (如: 翻译, 预处理, 南光...)";
        }
    }
});

// 添加自定义节点图标
app.registerExtension({
    name: "NanguangTranslator.Icons",
    
    async getCustomWidgets() {
        return {
            NANGUANG_TRANSLATOR_INFO: {
                type: "custom",
                widget: function(node, inputName, inputData, app) {
                    const container = document.createElement("div");
                    container.style.padding = "10px";
                    container.style.background = "linear-gradient(135deg, #f0f8ff, #e6f7ff)";
                    container.style.borderRadius = "8px";
                    container.style.margin = "10px 0";
                    container.style.border = "2px solid #4A90E2";
                    
                    container.innerHTML = `
                        <div style="display: flex; align-items: center; margin-bottom: 8px;">
                            <div style="width: 24px; height: 24px; background: #4A90E2; border-radius: 50%; margin-right: 8px;"></div>
                            <div style="font-weight: bold; color: #333; font-size: 14px;">
                                南光AIGC翻译插件
                            </div>
                        </div>
                        <div style="font-size: 12px; color: #666; line-height: 1.4;">
                            版本: 1.0.0 | 简化版<br>
                            支持多语言翻译和文本预处理
                        </div>
                    `;
                    
                    return container;
                }
            }
        };
    }
});

// 添加右键菜单选项
app.registerExtension({
    name: "NanguangTranslator.ContextMenu",
    
    async setup() {
        // 监听右键菜单事件
        const orig = LiteGraph.ContextMenu;
        LiteGraph.ContextMenu = function(menu, options, e) {
            const result = orig.call(this, menu, options, e);
            
            // 添加南光AIGC翻译相关选项
            if (options) {
                menu.push(null); // 分隔线
                menu.push({
                    content: "📝 使用文本预处理",
                    callback: () => {
                        const node = app.graph.addNode("TextPreprocessorNode");
                        node.pos = options.canvas.canvas.getBoundingClientRect();
                    }
                });
                menu.push({
                    content: "🌐 使用百度翻译",
                    callback: () => {
                        const node = app.graph.addNode("BaiduTranslatorNode");
                        node.pos = options.canvas.canvas.getBoundingClientRect();
                    }
                });
            }
            
            return result;
        };
    }
});