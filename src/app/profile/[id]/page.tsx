export default function UserProfile({ params }: any) {
  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <p className="text-2xl">Profile page {params.id}</p>
    </div>
  );
}
