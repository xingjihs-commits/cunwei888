"""
gen-tabbar-icons.py - 生成 tabBar 简笔图标（service / message）

用法：python scripts/gen-tabbar-icons.py
产出：static/tabbar/{service,service-active,message,message-active}.png
规格：81x81 RGBA，普通态 $text-sub(#757575)，active 态 $primary(#C41E24)
"""
import os
from PIL import Image, ImageDraw

SIZE = 81
SS = 4  # 4x 超采样，抗锯齿
SUB = "#757575"      # $text-sub
PRIMARY = "#C41E24"  # $primary

OUT = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "static", "tabbar"))


def hexrgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def new_canvas():
    return Image.new("RGBA", (SIZE * SS, SIZE * SS), (0, 0, 0, 0))


def draw_service(color):
    """九宫格：3x3 圆角方块"""
    img = new_canvas()
    d = ImageDraw.Draw(img)
    c = hexrgb(color)
    box, gap, x0, y0, r = 15 * SS, 6 * SS, 12 * SS, 12 * SS, 3 * SS
    for row in range(3):
        for col in range(3):
            x = x0 + col * (box + gap)
            y = y0 + row * (box + gap)
            d.rounded_rectangle([x, y, x + box, y + box], radius=r, fill=c)
    return img.resize((SIZE, SIZE), Image.LANCZOS)


def draw_message(color):
    """消息气泡：圆角矩形 + 左下小尾巴"""
    img = new_canvas()
    d = ImageDraw.Draw(img)
    c = hexrgb(color)
    d.rounded_rectangle([12 * SS, 15 * SS, 69 * SS, 55 * SS], radius=12 * SS, fill=c)
    d.polygon([(26 * SS, 54 * SS), (40 * SS, 54 * SS), (24 * SS, 68 * SS)], fill=c)
    return img.resize((SIZE, SIZE), Image.LANCZOS)


def main():
    os.makedirs(OUT, exist_ok=True)
    for name, fn in (("service", draw_service), ("message", draw_message)):
        fn(SUB).save(os.path.join(OUT, name + ".png"))
        fn(PRIMARY).save(os.path.join(OUT, name + "-active.png"))
    print("generated 4 icons in", OUT)


if __name__ == "__main__":
    main()
