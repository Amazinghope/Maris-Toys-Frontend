function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-600 grid gap-2 sm:grid-cols-3">
        <div>
          <div className="font-semibold text-gray-900">Edu‑Toy</div>
          <p>Learn through play. Curated toys for curious minds.</p>
        </div>
        <div>
          <div className="font-semibold text-gray-900">Help</div>
          <ul className="space-y-1">
            <li>Shipping & Returns</li>
            <li>Privacy & Security</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-gray-900">Newsletter</div>
          <div className="mt-2 flex gap-2">
            <input className="border rounded-xl px-3 py-2 w-full" placeholder="Email address" />
            <button className="px-4 py-2 rounded-xl bg-black text-white">Subscribe</button>
          </div>
        </div>
        
      </div>
      <p className="text-gray-600 flex justify-center pt-2 py-8">
       © {new Date().getFullYear()} Maris Educreative Toy Store. All Rights Reserved.{" "}
  <span className="ml-1">Powered by <span className="font-medium text-gray-800">AMZH Technologies</span></span>
      </p>
    </footer>
  );
}
export default Footer