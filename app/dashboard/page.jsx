import Layout from './layout'
export default function dashboard() {
  return (
    <Suspense fallback={<div>Loading dashboard…</div>}>
      <Layout />
    </Suspense>
  )
}
