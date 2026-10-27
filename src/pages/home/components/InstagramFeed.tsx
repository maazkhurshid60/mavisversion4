import Reveal from "@/components/base/Reveal";
import SectionHeading from "@/components/base/SectionHeading";
import { instagramPosts } from "@/mocks/home";
import ButtonLabel from "@/components/base/ButtonLabel";

export default function InstagramFeed() {
  return (
    <section
      id="journal"
      className="relative z-20 bg-background-50 px-4 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1500px]">
        <SectionHeading
          index="09"
          label="Follow Our Journey"
          title="@team_medved"
          description="New listings, neighborhood stories, and behind-the-scenes moments from across Los Angeles. Fresh on the feed every week."
          align="left"
          className="max-w-2xl"
        />

        <Reveal y={20} delay={180}>
          <div className="mt-9 flex flex-wrap items-center justify-start gap-x-10 gap-y-4">
            <div className="flex items-baseline gap-2.5">
              <span className="font-heading text-[1.2rem] font-medium tracking-[-0.02em] text-foreground-950">12.4K</span>
              <span className="font-body text-[0.85rem] font-light text-foreground-500">Followers</span>
            </div>
            <span className="h-4 w-px bg-foreground-950/25" aria-hidden="true" />
            <div className="flex items-baseline gap-2.5">
              <span className="font-heading text-[1.2rem] font-medium tracking-[-0.02em] text-foreground-950">890</span>
              <span className="font-body text-[0.85rem] font-light text-foreground-500">Posts</span>
            </div>
            <a
              href="https://www.instagram.com/team_medved/"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="btn btn-outline inline-flex items-center gap-2.5 px-6 py-3 btn-label"
            >
              <ButtonLabel>Follow Us</ButtonLabel>
              <i className="ri-instagram-line text-sm" />
            </a>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
          {instagramPosts.map((post, index) => (
            <Reveal key={post.image} index={index} step={90} y={26}>
              <a
                href="https://www.instagram.com/team_medved/"
                target="_blank"
                rel="nofollow noopener noreferrer"
                aria-label={`${post.caption}, ${post.location}`}
                className="group relative block aspect-square w-full overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={`${post.caption} in ${post.location} by Team Medved`}
                  title={`Team Medved, ${post.location}`}
                  className="img-push absolute inset-0 h-full w-full object-cover object-top"
                />
                <span className="veil" aria-hidden="true" />

                <span className="veil-content absolute inset-0 flex flex-col justify-end p-4 text-left">
                  <span className="flex items-center gap-1.5 font-label text-[8px] text-background-50/80">
                    <i className="ri-map-pin-2-line text-[11px]" />
                    {post.location}
                  </span>
                  <span className="mt-1.5 block font-body text-[0.78rem] font-light leading-[1.45] text-background-50">
                    {post.caption}
                  </span>
                  <span className="mt-2 flex items-center gap-1.5 font-body text-[10px] text-background-50/75">
                    <i className="ri-heart-3-line text-[11px]" />
                    {post.likes}
                  </span>
                </span>

                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center border border-background-50/40 text-background-50 transition-opacity duration-300 group-hover:opacity-0">
                  <i className="ri-instagram-line text-sm" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}