import { Icon } from "@/components/icon";
import type { InfoPhoto } from "@/data/portfolio";
import { faImage } from "@fortawesome/free-solid-svg-icons";

/**
 * A portrait photo, or until one is added (see infoPhotos in
 * src/data/portfolio.ts), a labelled placeholder of exactly the same shape so
 * swapping in the real photo never moves the layout.
 */
export function PhotoSlot({
  photo,
  placeholderLabel,
  className = "",
}: {
  photo: InfoPhoto;
  placeholderLabel: string;
  className?: string;
}) {
  return (
    <div className={`relative aspect-[4/5] overflow-hidden rounded-frame border border-ink/10 shadow-soft ${className}`}>
      {photo.src ? (
        // eslint-disable-next-line @next/next/no-img-element -- local photo, sized by its slot
        <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-sand text-ink-faint"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(35,31,26,0.035) 0 1px, transparent 1px 14px)",
          }}
        >
          <Icon icon={faImage} className="h-6 w-6" />
          <span className="text-sm font-medium">{placeholderLabel}</span>
        </div>
      )}
    </div>
  );
}
