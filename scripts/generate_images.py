from PIL import Image, ImageDraw, ImageFilter
from pathlib import Path
import math, random

OUT = Path('/mnt/data/couldaikillusall-site/public/assets/articles')
BRAND = Path('/mnt/data/couldaikillusall-site/public/assets/brand')
OUT.mkdir(parents=True, exist_ok=True)
BRAND.mkdir(parents=True, exist_ok=True)

TOPICS = {
 'could-ai-kill-us-all': ('earth_balance', (8,18,42), (30,195,205), (236,180,72)),
 'how-could-ai-kill-humanity': ('risk_branches', (18,14,38), (238,96,75), (55,194,201)),
 'will-ai-kill-us-within-10-years': ('timeline', (12,17,42), (147,108,255), (238,184,62)),
 'ai-alignment-problem-explained': ('alignment', (7,25,41), (34,211,181), (246,178,65)),
 'agi-vs-superintelligence-risks': ('levels', (11,15,38), (83,132,255), (201,122,255)),
 'can-ai-become-uncontrollable': ('containment', (12,18,34), (245,94,90), (63,205,196)),
 'ai-cyberattacks-critical-infrastructure': ('cyber_city', (5,20,34), (27,207,223), (91,143,255)),
 'ai-biosecurity-risks': ('helix', (10,26,30), (50,205,158), (244,179,70)),
 'autonomous-weapons-ai-war': ('control_boundary', (24,16,30), (239,104,78), (90,158,255)),
 'humanoid-robots-risk-safety': ('humanoid', (7,22,34), (54,202,196), (236,184,72)),
 'is-ai-conscious-sentient': ('mind_field', (18,12,38), (164,103,255), (58,206,211)),
 'how-to-prevent-catastrophic-ai-risk': ('shield_layers', (7,24,38), (45,204,167), (246,190,68)),
}

def lerp(a,b,t): return int(a+(b-a)*t)
def gradient(size, bg, accent):
    w,h=size
    base=Image.new('RGB', size, bg)
    # Fast diagonal tint using Pillow gradients rather than per-pixel Python loops.
    g=Image.linear_gradient('L').resize((w,h)).rotate(35, resample=Image.Resampling.BICUBIC, expand=False)
    tint=Image.new('RGB', size, tuple(min(255,v+26) for v in bg))
    base=Image.composite(tint, base, g.point(lambda p: int(p*.34)))
    # Soft accent glow.
    ov=Image.new('RGBA',size,(0,0,0,0)); od=ImageDraw.Draw(ov,'RGBA')
    r=int(min(w,h)*.50); cx=int(w*.73); cy=int(h*.28)
    od.ellipse((cx-r,cy-r,cx+r,cy+r),fill=(*accent,34))
    ov=ov.filter(ImageFilter.GaussianBlur(int(min(w,h)*.16)))
    return Image.alpha_composite(base.convert('RGBA'),ov).convert('RGB')

def stars(draw,w,h,seed,accent):
    r=random.Random(seed)
    for _ in range(max(40,int(w*h/18000))):
        x=r.randint(0,w-1); y=r.randint(0,h-1); rr=r.choice([1,1,1,2])
        a=r.randint(70,170)
        c=tuple(int(accent[i]*.35 + 255*.25) for i in range(3))
        draw.ellipse((x-rr,y-rr,x+rr,y+rr), fill=c)

def glow_circle(base, center, radius, color, alpha=180):
    ov=Image.new('RGBA', base.size,(0,0,0,0)); d=ImageDraw.Draw(ov)
    for i in range(18,0,-1):
        rr=radius*(i/18)
        a=int(alpha*(1-i/19)*0.13)
        d.ellipse((center[0]-rr,center[1]-rr,center[0]+rr,center[1]+rr),fill=(*color,a))
    ov=ov.filter(ImageFilter.GaussianBlur(max(2,int(radius*.035))))
    return Image.alpha_composite(base.convert('RGBA'),ov)

def network(draw,cx,cy,r,color,seed=1,n=24):
    rng=random.Random(seed)
    pts=[]
    for i in range(n):
        ang=2*math.pi*i/n + rng.uniform(-.1,.1)
        rr=r*rng.uniform(.38,1)
        pts.append((cx+math.cos(ang)*rr,cy+math.sin(ang)*rr))
    for i,p in enumerate(pts):
        for j in range(i+1,min(n,i+4)):
            q=pts[j]
            draw.line((p,q), fill=(*color,95), width=max(1,int(r*.008)))
    for p in pts:
        rr=max(2,int(r*.018)); draw.ellipse((p[0]-rr,p[1]-rr,p[0]+rr,p[1]+rr), fill=(*color,220))

def earth(draw,cx,cy,r,accent):
    draw.ellipse((cx-r,cy-r,cx+r,cy+r), fill=(11,65,90,255), outline=(*accent,230), width=max(3,int(r*.03)))
    # stylized continents
    land=(38,163,147,230)
    polys=[[(cx-r*.55,cy-r*.28),(cx-r*.22,cy-r*.6),(cx+r*.08,cy-r*.38),(cx-r*.02,cy-r*.08),(cx-r*.35,cy+r*.06)],
           [(cx+r*.18,cy-r*.55),(cx+r*.58,cy-r*.32),(cx+r*.46,cy+r*.05),(cx+r*.18,cy+r*.18),(cx+r*.02,cy-r*.08)],
           [(cx-r*.15,cy+r*.18),(cx+r*.1,cy+r*.25),(cx+r*.22,cy+r*.62),(cx-.02*r,cy+r*.75),(cx-r*.26,cy+r*.44)]]
    for p in polys: draw.polygon(p, fill=land)
    for k in [-.5,0,.5]:
        yy=cy+k*r*.6; draw.arc((cx-r,yy-r*.22,cx+r,yy+r*.22),0,180,fill=(110,215,220,90),width=max(1,int(r*.01)))

def shield(draw,cx,cy,w,h,color):
    pts=[(cx,cy-h*.52),(cx+w*.48,cy-h*.3),(cx+w*.4,cy+h*.15),(cx,cy+h*.52),(cx-w*.4,cy+h*.15),(cx-w*.48,cy-h*.3)]
    draw.polygon(pts, fill=(*color,38), outline=(*color,220))

def render(slug, size, variant):
    motif,bg,a1,a2=TOPICS[slug]; w,h=size
    im=gradient(size,bg,a1).convert('RGBA'); d=ImageDraw.Draw(im,'RGBA'); stars(d,w,h,hash(slug+variant)&0xffff,a1)
    # ambient orbs
    im=glow_circle(im,(int(w*.74),int(h*.32)),int(min(w,h)*.25),a1,160); d=ImageDraw.Draw(im,'RGBA')
    lw=max(2,int(min(w,h)*.006))

    if motif=='earth_balance':
        earth(d,w*.52,h*.55,min(w,h)*.22,a1); network(d,w*.77,h*.40,min(w,h)*.17,a1,5)
        d.line((w*.25,h*.73,w*.48,h*.57),fill=(*a2,190),width=lw); d.ellipse((w*.20,h*.65,w*.29,h*.78),fill=(*a2,200))
    elif motif=='risk_branches':
        cx,cy=w*.48,h*.48; network(d,cx,cy,min(w,h)*.16,a1,6,18)
        endpoints=[(.18,.22),(.82,.20),(.88,.55),(.72,.82),(.25,.82),(.12,.52)]
        for idx,(px,py) in enumerate(endpoints):
            d.line((cx,cy,w*px,h*py),fill=(*a2,150),width=lw)
            rr=min(w,h)*.055; d.ellipse((w*px-rr,h*py-rr,w*px+rr,h*py+rr),outline=(*a2,210),width=lw)
    elif motif=='timeline':
        y=h*.66; d.line((w*.12,y,w*.88,y),fill=(*a2,210),width=lw*2)
        for i in range(6):
            x=w*(.16+i*.136); d.line((x,y-h*.025,x,y+h*.025),fill=(*a2,220),width=lw)
        earth(d,w*.28,h*.39,min(w,h)*.15,a1); network(d,w*.72,h*.36,min(w,h)*.17,a1,8)
        d.polygon([(w*.86,y),(w*.82,y-h*.025),(w*.82,y+h*.025)],fill=(*a2,240))
    elif motif=='alignment':
        # two paths meeting
        d.arc((w*.12,h*.18,w*.72,h*.92),200,340,fill=(*a2,210),width=lw*2)
        d.arc((w*.28,h*.18,w*.88,h*.92),200,340,fill=(*a1,230),width=lw*2)
        network(d,w*.74,h*.33,min(w,h)*.15,a1,9)
        d.ellipse((w*.23,h*.48,w*.32,h*.62),fill=(*a2,210)); d.line((w*.275,h*.61,w*.275,h*.78),fill=(*a2,210),width=lw*2)
    elif motif=='levels':
        levels=[(.18,.70,.22,.14),(.40,.60,.22,.24),(.62,.47,.22,.37)]
        for i,(x,y,ww,hh) in enumerate(levels):
            col=a1 if i<2 else a2; d.rounded_rectangle((w*x,h*y,w*(x+ww),h*(y+hh)),radius=int(min(w,h)*.025),fill=(*col,35),outline=(*col,200),width=lw)
            network(d,w*(x+ww/2),h*(y+hh*.42),min(w,h)*(.06+.02*i),col,10+i,12+i*3)
        d.line((w*.12,h*.88,w*.90,h*.88),fill=(220,230,245,80),width=lw)
    elif motif=='containment':
        cx,cy=w*.52,h*.49; network(d,cx,cy,min(w,h)*.13,a1,13,22)
        for rr,col in [(0.22,a1),(0.31,a2),(0.40,a1)]:
            r=min(w,h)*rr; d.ellipse((cx-r,cy-r,cx+r,cy+r),outline=(*col,135),width=lw)
        # one probing path
        d.line((cx+min(w,h)*.12,cy,w*.88,h*.40),fill=(*a2,210),width=lw); d.ellipse((w*.875,h*.385,w*.895,h*.415),fill=(*a2,240))
    elif motif=='cyber_city':
        base=h*.80
        for i,x in enumerate([.12,.20,.28,.38,.49,.60,.70,.79,.86]):
            bh=h*(.15+((i*37)%100)/420); bw=w*.055
            d.rectangle((w*x,base-bh,w*x+bw,base),fill=(25,66,82,220),outline=(*a1,105),width=max(1,lw//2))
            for yy in range(int(base-bh+12),int(base-8),18): d.line((w*x+8,yy,w*x+bw-8,yy),fill=(*a1,80),width=1)
        shield(d,w*.50,h*.48,w*.32,h*.48,a1); network(d,w*.50,h*.48,min(w,h)*.13,a1,15)
        for x in [.08,.91]: d.line((w*x,h*.25,w*.35 if x<.5 else w*.65,h*.43),fill=(*a2,120),width=lw)
    elif motif=='helix':
        pts1=[]; pts2=[]
        for i in range(80):
            t=i/79; y=h*(.14+.70*t); xmid=w*(.46+.10*(t-.5)); amp=w*.095
            pts1.append((xmid+amp*math.sin(t*math.pi*4),y)); pts2.append((xmid-amp*math.sin(t*math.pi*4),y))
        d.line(pts1,fill=(*a1,230),width=lw*2); d.line(pts2,fill=(*a2,210),width=lw*2)
        for i in range(0,80,7): d.line((pts1[i],pts2[i]),fill=(220,235,225,90),width=lw)
        shield(d,w*.73,h*.50,w*.25,h*.46,a1)
    elif motif=='control_boundary':
        d.line((w*.52,h*.13,w*.52,h*.86),fill=(*a2,220),width=lw*2)
        # human node
        d.ellipse((w*.20,h*.28,w*.29,h*.41),fill=(*a2,200)); d.line((w*.245,h*.41,w*.245,h*.67),fill=(*a2,200),width=lw*2); d.line((w*.245,h*.49,w*.15,h*.58),fill=(*a2,180),width=lw)
        # abstract unmanned shapes
        for px,py in [(.68,.28),(.79,.48),(.69,.69)]:
            d.polygon([(w*px,h*(py-.05)),(w*(px+.075),h*py),(w*px,h*(py+.05)),(w*(px-.075),h*py)],fill=(*a1,45),outline=(*a1,210))
            d.line((w*(px-.10),h*py,w*(px+.10),h*py),fill=(*a1,160),width=lw)
    elif motif=='humanoid':
        cx=w*.62; head=min(w,h)*.075; d.ellipse((cx-head,h*.20-head,cx+head,h*.20+head),fill=(105,132,145,170),outline=(*a1,220),width=lw)
        d.rounded_rectangle((cx-w*.07,h*.29,cx+w*.07,h*.59),radius=int(w*.03),fill=(52,85,103,180),outline=(*a1,190),width=lw)
        for x1,x2 in [(-.07,-.15),(.07,.15)]: d.line((cx+w*x1,h*.35,cx+w*x2,h*.60),fill=(*a1,180),width=lw*2)
        d.line((cx-w*.03,h*.59,cx-w*.08,h*.82),fill=(*a1,180),width=lw*2); d.line((cx+w*.03,h*.59,cx+w*.08,h*.82),fill=(*a1,180),width=lw*2)
        # human + safety boundary
        d.ellipse((w*.22,h*.33,w*.28,h*.43),fill=(*a2,210)); d.line((w*.25,h*.43,w*.25,h*.66),fill=(*a2,210),width=lw*2)
        d.arc((w*.33,h*.18,w*.83,h*.88),80,280,fill=(*a2,120),width=lw)
    elif motif=='mind_field':
        # profile-like arc and internal nodes
        d.arc((w*.27,h*.18,w*.72,h*.85),100,270,fill=(*a2,230),width=lw*2)
        network(d,w*.54,h*.45,min(w,h)*.20,a1,18,28)
        for rr in [.28,.36]:
            r=min(w,h)*rr; d.arc((w*.54-r,h*.45-r,w*.54+r,h*.45+r),200,335,fill=(*a1,70),width=lw)
        im=glow_circle(im,(int(w*.78),int(h*.30)),int(min(w,h)*.14),a2,150); d=ImageDraw.Draw(im,'RGBA')
    elif motif=='shield_layers':
        cx,cy=w*.53,h*.50; earth(d,cx,cy,min(w,h)*.14,a1)
        for mul,col in [(.28,a1),(.38,a2),(.48,a1)]: shield(d,cx,cy,w*mul,h*mul*1.18,col)
        network(d,w*.79,h*.34,min(w,h)*.10,a1,21,15)

    # vignette
    vig=Image.new('L',size,0); vd=ImageDraw.Draw(vig)
    margin=int(min(w,h)*.05); vd.ellipse((-w*.15,-h*.25,w*1.15,h*1.25),fill=235)
    vig=vig.filter(ImageFilter.GaussianBlur(int(min(w,h)*.15)))
    shade=Image.new('RGBA',size,(0,0,0,110)); shade.putalpha(Image.eval(vig,lambda p: 255-p))
    im=Image.alpha_composite(im,shade).convert('RGB')
    return im

sizes=[('1600x900',(1600,900)),('1200x900',(1200,900)),('1200x1200',(1200,1200))]
for slug in TOPICS:
    for suffix,size in sizes:
        img=render(slug,size,suffix)
        img.save(OUT/f'{slug}-{suffix}.webp','WEBP',quality=86,method=4)

# Hero derived from foundation concept but with a wider, richer composition
hero=render('could-ai-kill-us-all',(1600,900),'hero')
hero.save(BRAND/'could-ai-kill-us-all-hero-1600x900.webp','WEBP',quality=88,method=4)
# Site mark
mark=Image.new('RGBA',(512,512),(7,18,38,255)); d=ImageDraw.Draw(mark,'RGBA')
mark=glow_circle(mark,(256,256),190,(30,195,205),190); d=ImageDraw.Draw(mark,'RGBA')
earth(d,256,270,118,(30,195,205)); network(d,324,190,92,(236,180,72),31,16)
d.ellipse((28,28,484,484),outline=(236,180,72,180),width=10)
mark.convert('RGB').save(BRAND/'site-mark-512.png','PNG',optimize=True)
print('generated',len(TOPICS)*3+2,'images')
