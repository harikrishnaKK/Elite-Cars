import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  ExternalLink, 
  Sparkles, 
  Image as ImageIcon, 
  Eye, 
  Copy, 
  Check, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';

interface ExtractedImage {
  src: string;
  alt: string;
}

const SAMPLE_HTML_TEMPLATES: { name: string; description: string; html: string }[] = [
  {
    name: 'Deal Room & Investment Memo',
    description: 'Executive commercial real estate offering memo with hotlinked property photography and investment metrics.',
    html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
  <div style="position: relative; height: 320px; background: #0f172a;">
    <img src="/src/assets/images/deal_multifamily_lux_1794457823484.jpg" alt="The Oakwood Residences Austin" style="width: 100%; height: 100%; object-fit: cover;" />
    <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(15,23,42,0.9)); padding: 24px; color: #ffffff;">
      <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #cbd5e1; font-weight: 600;">Class A Multifamily · Austin, TX</span>
      <h2 style="font-size: 24px; font-weight: 700; margin: 4px 0 0 0;">The Oakwood Residences</h2>
    </div>
  </div>

  <div style="padding: 24px;">
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; padding: 16px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; text-align: center;">
      <div>
        <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600;">Target Net IRR</div>
        <div style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 2px;">18.2%</div>
      </div>
      <div>
        <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600;">Equity Multiple</div>
        <div style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 2px;">2.10x</div>
      </div>
      <div>
        <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600;">Preferred Return</div>
        <div style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 2px;">8.0% / yr</div>
      </div>
      <div>
        <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600;">Min. Commitment</div>
        <div style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 2px;">$50,000</div>
      </div>
    </div>

    <div style="margin-top: 20px;">
      <h3 style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Investment Thesis</h3>
      <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0;">
        Acquisition of 280 garden-style multifamily units with programmatic interior finish renovations, proprietary smart-rent automation, and institutional tenancy in Austin's primary high-tech corridor.
      </p>
    </div>
  </div>
</div>`
  },
  {
    name: 'Industrial Logistics Offering Memo',
    description: 'Institutional logistics hub syndication sheet with cross-dock photography and triple-net tenant metrics.',
    html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden;">
  <div style="position: relative; height: 320px; background: #0f172a;">
    <img src="/src/assets/images/deal_industrial_logistics_1794457824784.jpg" alt="Pacific Logistics Center" style="width: 100%; height: 100%; object-fit: cover;" />
    <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(15,23,42,0.9)); padding: 24px; color: #ffffff;">
      <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #cbd5e1; font-weight: 600;">Industrial Cross-Dock · Ontario, CA</span>
      <h2 style="font-size: 24px; font-weight: 700; margin: 4px 0 0 0;">Apex Pacific Logistics Center</h2>
    </div>
  </div>

  <div style="padding: 24px;">
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; padding: 16px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; text-align: center;">
      <div>
        <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600;">Target Net IRR</div>
        <div style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 2px;">16.4%</div>
      </div>
      <div>
        <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600;">Clear Height</div>
        <div style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 2px;">36 Ft</div>
      </div>
      <div>
        <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600;">Lease Structure</div>
        <div style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 2px;">100% NNN</div>
      </div>
      <div>
        <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600;">Total Square Feet</div>
        <div style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 2px;">420,000</div>
      </div>
    </div>
  </div>
</div>`
  }
];

export const HtmlScreenImporter: React.FC = () => {
  const [htmlInput, setHtmlInput] = useState<string>(SAMPLE_HTML_TEMPLATES[0].html);
  const [extractedImages, setExtractedImages] = useState<ExtractedImage[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');

  // Parse HTML and extract images
  useEffect(() => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlInput, 'text/html');
      const imgElements = doc.querySelectorAll('img');
      const images: ExtractedImage[] = [];
      imgElements.forEach((img) => {
        const src = img.getAttribute('src');
        if (src) {
          images.push({
            src,
            alt: img.getAttribute('alt') || 'Hotlinked asset'
          });
        }
      });
      setExtractedImages(images);
    } catch (e) {
      console.error('Error parsing HTML:', e);
    }
  }, [htmlInput]);

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyTemplate = (tpl: typeof SAMPLE_HTML_TEMPLATES[0]) => {
    setHtmlInput(tpl.html);
  };

  return (
    <div className="space-y-6">
      
      {/* Title & Help Banner */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <Code2 className="w-6 h-6 text-indigo-600" />
          <span>HTML & Screen Hotlink Studio</span>
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Paste any HTML snippet or custom screen code. The studio hotlinks embedded imagery and renders the screen live with full CSS styling.
        </p>
      </div>

      {/* Info Callout */}
      <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-lg flex items-start gap-3 text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block mb-0.5">Direct HTML & Hotlink Integration:</span>
          If you have screens or an HTML export you intended to build, you can paste the HTML code directly into the editor below or into your chat message. The system parses all <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">&lt;img src="..."&gt;</code> tags and hotlinks the imagery directly into the responsive layout.
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 mr-1">Load Preset:</span>
        {SAMPLE_HTML_TEMPLATES.map((tpl, i) => (
          <button
            key={i}
            onClick={() => handleApplyTemplate(tpl)}
            className="px-3 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-md transition-colors shadow-2xs"
          >
            {tpl.name}
          </button>
        ))}
      </div>

      {/* Main Workspace Split: Code vs Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Code Editor (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-slate-500" />
              HTML Source Code
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-2 py-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded transition-colors flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="p-3">
            <textarea
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              rows={18}
              placeholder="Paste your HTML here with <img src='...'> tags..."
              className="w-full font-mono text-[11px] text-slate-800 bg-slate-50 p-3 rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none leading-relaxed"
            />
          </div>

          {/* Extracted Images Strip */}
          <div className="p-3 border-t border-slate-100 bg-slate-50/50">
            <span className="text-[11px] font-bold text-slate-700 block uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
              Hotlinked Image Assets ({extractedImages.length})
            </span>

            {extractedImages.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No &lt;img&gt; tags detected in HTML snippet.</p>
            ) : (
              <div className="space-y-2">
                {extractedImages.map((img, i) => (
                  <div key={i} className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded text-xs">
                    <img 
                      src={img.src} 
                      alt={img.alt} 
                      referrerPolicy="no-referrer"
                      className="w-10 h-8 rounded object-cover border border-slate-100 shrink-0 bg-slate-100" 
                    />
                    <div className="truncate flex-1">
                      <span className="font-semibold text-slate-800 block truncate text-[11px]">{img.alt}</span>
                      <span className="font-mono text-[10px] text-slate-500 block truncate">{img.src}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Live Rendered Preview (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-indigo-600" />
              Live Screen Render
            </span>
            <span className="text-[11px] text-slate-500">Rendered DOM</span>
          </div>

          <div className="p-6 bg-slate-100 min-h-[500px] flex items-center justify-center overflow-auto">
            <div 
              className="w-full"
              dangerouslySetInnerHTML={{ __html: htmlInput }}
            />
          </div>
        </div>

      </div>

    </div>
  );
};
